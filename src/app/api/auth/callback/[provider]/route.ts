import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/user.model';

const getToken = async (code: string) => {
  const providerData = {
    url: 'https://oauth2.googleapis.com/token',
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: `${process.env.REDIRECT_URI}/google`,
  }

  const res = await fetch(providerData.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: providerData.clientId,
      client_secret: providerData.clientSecret,
      redirect_uri: providerData.redirectUri,
      code,
      grant_type: 'authorization_code',
    }).toString(),
  });
  return res.json();
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });

  const tokenData = await getToken(code);

  // Fetch user profile
  const profileUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
  const profileRes = await fetch(profileUrl, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const profile = await profileRes.json();

  const {email, name, picture} = profile;

  connectDB();

  // Check if user already exists while not selecting the password
  let user = await User.findOne({ email })
  if(user){
    user.name = name;
    user.picture = picture;
    user.save();
  } else {
    user = await User.create({ email, name, picture })
  }

  const thisUserData = {
    id: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture
  }
  
  // Sign a JWT with user information
  const token = jwt.sign(thisUserData, process.env.JWT_SECRET!, { expiresIn: '1h' });

  // Optionally, set a cookie and redirect
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
  response.cookies.set('auth-token', token, { httpOnly: true, maxAge: 3600 });

  return response;
}

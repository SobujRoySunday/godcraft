import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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

  console.log(profile);


  // Sign a JWT with user information
  const token = jwt.sign(profile, process.env.JWT_SECRET!, { expiresIn: '1h' });

  // Optionally, set a cookie and redirect
  const response = NextResponse.redirect('http://localhost:3000/');
  response.cookies.set('auth-token', token, { httpOnly: true, maxAge: 3600 });

  return response;
}

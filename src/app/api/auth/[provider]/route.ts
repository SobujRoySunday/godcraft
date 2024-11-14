import { NextResponse } from 'next/server';

const providers = {
  google: {
    url: 'https://accounts.google.com/o/oauth2/auth',
    clientId: process.env.GOOGLE_CLIENT_ID!,
    scope: 'https://www.googleapis.com/auth/userinfo.profile email',
    responseType: 'code',
    redirectUri: `${process.env.REDIRECT_URI}/google`,
  },
};

export async function GET() {
  const provider = providers['google'];
  if (!provider) return NextResponse.json({ error: 'Provider not supported' }, { status: 400 });

  const url = new URL(provider.url);
  url.searchParams.set('client_id', provider.clientId);
  url.searchParams.set('redirect_uri', provider.redirectUri);
  url.searchParams.set('response_type', provider.responseType);
  url.searchParams.set('scope', provider.scope);

  return NextResponse.redirect(url.toString());
}

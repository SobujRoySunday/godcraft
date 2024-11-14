'use client';

import { useRouter } from 'next/navigation';

export default function AuthButtons() {
    const router = useRouter();

    const handleSignIn = (provider: string) => {
        router.push(`/api/auth/${provider}`);
    };

    return (
        <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded' onClick={() => handleSignIn('google')}>Sign in with Google</button>
        </div>
    );
}

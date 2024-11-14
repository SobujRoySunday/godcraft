'use client';

import { googleImage } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AuthButtons() {
    const router = useRouter();

    const handleSignIn = (provider: string) => {
        router.push(`/api/auth/${provider}`);
    };

    return (
        <div>
            <button className='flex items-center gap-2 text-white font-semibold py-2 px-8 border-2 hover:bg-gray-900 transition-all' onClick={() => handleSignIn('google')}>
                <Image src={googleImage} alt="Google" width={24} height={24} className='h-6 object-contain' />
                Continue with Google
            </button>
        </div>
    );
}

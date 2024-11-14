import AuthButtons from '@/components/AuthButtons'
import Container from '@/components/Container'
import React from 'react'

const page = () => {
    return (
        <Container>
            <div className='h-[calc(100vh-140px)] flex justify-center items-center'>
                <div className='p-4 border-2 border-gray-600 rounded-lg flex flex-col justify-center items-center gap-2'>
                    <AuthButtons />
                </div>
            </div>
        </Container>
    )
}

export default page
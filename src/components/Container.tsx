import React from 'react'

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='w-8/12 mx-auto flex flex-col p-4 gap-2'>{children}</section>
    )
}

export default Container
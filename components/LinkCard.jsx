import React from 'react'
import Link from 'next/link'
export default function LinkCard({ href = "/", value = 0, title, icon, color}) {
    return (
        <Link href={href} className='flex'>
            <div>
                <div className={`bg-${color}-200 w-[50px] h-[50px] rounded-full flex justify-center items-center mr-3`}>
                    {icon}
                </div>
            </div>
            <div>
                <h1 className='font-bold text-3xl'>
                    {value}
                </h1>
                <p className='text-slate-500'>
                    {title}
                </p>
            </div>
        </Link>
    )
}

import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import Title from './Title';
export default function Migas({ href, text, icon }) {
    return (
        <div className='flex'>
            <Link href={href} >
                <IoIosArrowBack size={35} />
            </Link>
            <Title title={text} />
        </div>

    )
}
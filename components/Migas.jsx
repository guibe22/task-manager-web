import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import Title from './Title';
export default function Migas({ href, text, icon }) {
    return (
        <Link href={href} className='flex'>
            <IoIosArrowBack size={35} />
            <Title title={text} />
        </Link>
    )
}

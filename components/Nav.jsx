import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Logo from './Logo';
import { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link'

const Nav = () => {
  
  const router = useRouter();
  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className='shadow-md'>
      <Navbar fluid className="sticky top-0 z-20 h-16 container mx-auto">
        <Navbar.Brand href="/">
          <Logo h="40px" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Do It</span>
        </Navbar.Brand>

        <Navbar.Collapse>
          <Link href="/">Inicio</Link>
          
        </Navbar.Collapse>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="" img={'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Picture.png'} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm ">{`Usuario`}</span>
              <span className="block truncate text-sm font-medium text-green-500">correo</span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOut}  > Cerrar Sesión</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </div>
  )
};

export default Nav;
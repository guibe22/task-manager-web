"use client"
import React, { useEffect } from 'react';
import useUsuarios from '../hooks/useUsuarios';
import { useState } from 'react';
import Link from 'next/link';

import { FaTasks, FaInfoCircle } from "react-icons/fa";

function ProjectCard({ title, creator, date, id }) {
  const { getUsuarioById } = useUsuarios();
  const [user, setUser] = useState(null);
  const handleUser = async () => {
    const user = await getUsuarioById(creator);
    setUser(user);
  }
  useEffect(() => {
    console.log(creator);
    handleUser()
  }, []);
  console.log(title, creator, date);
  return (
    <div className="bg-gray-100  to-white/5 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="text-3xl p-4">
          <FaTasks />
        </div>
        <div className="p-2">
          <p className="text-xl font-bold">{title}</p>
          {user && user.nombre && (<p className=" font-medium">{user.nombre}</p>)}
          <p className="text-sm">{date}</p>
        </div>
      </div>
      <div class="border-t  p-4 bg-orange-100 rounded-lg">
        <Link href={`/proyecto/${id}`} class="inline-flex space-x-2 items-center text-center">
          <FaInfoCircle />
          <span>Mas Informacion</span>
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
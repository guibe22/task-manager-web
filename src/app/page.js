'use client'
import Image from "next/image";
import withAuth from '../../utils/withAuth';
import { Nav, Layout, StatsCard, ProjectCard } from "../../components";
import useUsuarios from "../../hooks/useUsuarios";
import { useEffect, useState } from "react";
import { RiCheckboxCircleLine, RiLoader2Line, RiCheckboxCircleFill } from "react-icons/ri";

function Home() {
  

  const projects = [
    { title: 'Matar a victor', creator: 'Wilber', date: '2024-03-25' },
    { title: 'Ser Full Stack', creator: 'Wilber', date: '2024-03-26' },
    { title: 'Delgado palomo', creator: 'Libe', date: '2024-03-27' },
    { title: 'Hola Mundo', creator: 'Libe', date: '2024-03-28' },
    { title: 'raisa', creator: 'Delgado', date: '2024-03-29' },
    { title: 'Ingles', creator: 'Delgado', date: '2024-03-30' },
    { title: 'Pegar BlockS', creator: 'Daniel', date: '2024-03-31' },
  ];
  return (
    <Layout>
      <div>
        <h1 class="font-bold py-4 uppercase">Estadisticas tareas</h1>
        <div id="stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Recibidos"
            number="10"
            icon={<RiCheckboxCircleLine className="w-10 h-10 text-blue-500" />}
          />
          <StatsCard
            title="En Progreso"
            number="5"
            icon={<RiLoader2Line className="w-10 h-10 text-yellow-500" />}
          />
          <StatsCard
            title="Finalizados"
            number="20"
            icon={<RiCheckboxCircleFill className="w-10 h-10 text-green-500" />}
          />
        </div>
        <div>
          <h1 class="font-bold py-4 uppercase">Mis Proyectos</h1>
          <div id="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                creator={project.creator}
                date={project.date}
              />
            ))}
          </div>

        </div>
      </div>

    </Layout>
  );
}

export default withAuth(Home);

'use client'
import Image from "next/image";
import withAuth from '../../utils/withAuth';
import { Nav, Layout, StatsCard, ProjectCard, ModalProyecto } from "../../components";
import useUsuarios from "../../hooks/useUsuarios";
import { useEffect, useState } from "react";
import { RiCheckboxCircleLine, RiLoader2Line, RiCheckboxCircleFill } from "react-icons/ri";
import { Button } from "flowbite-react"
import useProyectos from "../../hooks/useProyectos";

function Home() {
  const { decodeToken, getUsuarioById } = useUsuarios();
  const { getProyectosByUserId } = useProyectos();
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const handleUser = async () => {
    const user = await decodeToken();
    console.log(user);
    setUser(user);
  }

  const handleProyectos = async () => {
    try {
      const user = await decodeToken();
      const res = await getProyectosByUserId(user.usuarioid);
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    handleUser();
    handleProyectos();
    setOpenModal(false);
  }, []);



  return (
    <Layout>

      <div>
        <h1 className="font-bold py-4 uppercase">Estadisticas tareas</h1>
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
          <h1 className="font-bold py-4 uppercase">Mis Proyectos</h1>
          <div className="flex justify-end mb-3">
            <Button color="warning" onClick={() => setOpenModal(true)}>
              Crear Nuevo Proyecto
            </Button>
           { user && user.usuarioid && (<ModalProyecto id={user.usuarioid} openModal={openModal} setOpenModal={setOpenModal} handleProyectos={handleProyectos} />)}
          </div>

          <div id="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.nombre}
                creator={project.creadorId}
                date={new Date(project.fecha).toLocaleDateString()}
              />
            ))}
          </div>

        </div>
      </div>

    </Layout>
  );
}

export default withAuth(Home);

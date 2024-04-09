'use client'
import Image from "next/image";
import withAuth from '../../utils/withAuth';
import { Nav, Layout, StatsCard, ProjectCard, ModalProyecto, } from "../../components";
import useUsuarios from "../../hooks/useUsuarios";
import { useEffect, useState } from "react";
import { RiCheckboxCircleLine, RiLoader2Line, RiCheckboxCircleFill } from "react-icons/ri";
import { Button, Spinner } from "flowbite-react"
import useProyectos from "../../hooks/useProyectos";

function Home() {
  const { decodeToken, getUsuarioById, } = useUsuarios();
  const { getProyectosByUserId,getEstadisticasProyecto } = useProyectos();
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [estadisticas, setEstadisticas] = useState(null);
  const handleUser = async () => {
    const user = await decodeToken();
    console.log(user);
    setUser(user);
  }

  const handleProyectos = async () => {
    try {
      setLoading(true);
      const user = await decodeToken();
      const res = await getProyectosByUserId(user.usuarioid)

      
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleEstadisticas = async () => {
    try {
      setLoading(true);
      const user = await decodeToken();
      const res = await getEstadisticasProyecto(user.usuarioid)
      setEstadisticas(res.estadisticas);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    handleUser();
    handleProyectos();
    setOpenModal(false);
    handleEstadisticas()
  }, []);



  return (
    <Layout>

      <div>
        <h1 className="font-bold py-4 uppercase">Estadisticas Proyectos</h1>
        <div id="stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Recibidos"
            number={estadisticas?.proyectosRecibidos}
            icon={<RiCheckboxCircleLine className="w-10 h-10 text-blue-500" />}
          />
          <StatsCard
            title="En Progreso"
            number={estadisticas?.proyectosEnProgreso}
            icon={<RiLoader2Line className="w-10 h-10 text-yellow-500" />}
          />
          <StatsCard
            title="Finalizados"
            number={estadisticas?.proyectosFinalizados}
            icon={<RiCheckboxCircleFill className="w-10 h-10 text-green-500" />}
          />
        </div>

        <div>
          <h1 className="font-bold py-4 uppercase">Mis Proyectos</h1>
          <div className="flex justify-end mb-3">
            <Button color="warning" onClick={() => setOpenModal(true)}>
              Crear Nuevo Proyecto
            </Button>
            {user && user.usuarioid && (<ModalProyecto id={user.usuarioid} openModal={openModal} setOpenModal={setOpenModal} handleProyectos={handleProyectos} />)}
          </div>

          {loading && <Spinner color="warning" className=" flex mx-auto" size="xl" />}
          <div id="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {!loading && projects.length && projects.length > 0 && projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.nombre}
                creator={project.creadorId}
                date={new Date(project.fecha).toLocaleDateString()}
                id={project.proyectoId}
              />
            ))}
          </div>

        </div>
      </div>

    </Layout>
  );
}

export default withAuth(Home);

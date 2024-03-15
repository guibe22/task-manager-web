'use client'
import Image from "next/image";
import withAuth from '../../utils/withAuth';
import { Nav } from "../../components";
 function Home() {
  return (
    <div>
      <Nav />
      <h1>Delgado Palomo</h1>
      
    </div>
  );
}

export default withAuth(Home);

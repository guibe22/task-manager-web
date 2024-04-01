import { Inter } from "next/font/google";
import "./globals.css";
import './flowbite.min.css'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DO IT",
  description: "La mejor aplicacion para administrar tus tareas y proyectos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>DO IT</title>
      </head>
      <body className="bg-gray-100 " >
        <NextTopLoader showSpinner={false} />
        {children}
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

      </body>


    </html>
  );
}

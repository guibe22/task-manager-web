export default function Prioridad({ prioridad }) {
    const colores = {
        baja: 'blue',
        media: 'yellow',
        alta: 'red',
      };
      const color = prioridad ? colores[prioridad] || 'gray' : 'gray';

    return (
        <span className={`inline-flex items-center bg-${color}-100 text-${color}-800 text-md font-medium px-2.5 py-0.5 rounded-full dark:bg-${color}-900 dark:text-${color}-300`}>
            <span className={`w-2 h-2 me-1 bg-${color}-500 rounded-full`}></span>
            {prioridad}
        </span>
    );
}
export default function Estado({ estado }) {
  // Objeto que mapea cada estado a su color correspondiente
  const colores = {
    abierto: 'blue',
    'en progreso': 'yellow',
    cerrado: 'green',
    reabierto: 'purple',
    cancelado: 'red'
  };

  // Obtener el color del estado del objeto de colores
  const color = estado ? colores[estado] || 'gray' : 'gray';

  return (
    <div>
      <div className={` text-xs inline-flex font-bold leading-sm uppercase px-3 py-1 bg-${color}-200 text-${color}-700 rounded-full`}>
        {!estado ? 'Sin asignar' : `${estado}`}
      </div>
    </div>
  )
}
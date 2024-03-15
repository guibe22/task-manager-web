import React from 'react'
import { MdOutlineWork } from 'react-icons/md'

export default function Empleado({ empleado }) {
  const color = !empleado ? 'gray' : 'green';
  
  return (
    <span className={`flex items-center gap-2 min-w-max`} >
      <span className={`bg-${color}-200 text-${color}-700 rounded text-xs  uppercase font-bold px-1 py-1`} > {!empleado ? 'Sin asignar' : `${empleado}`}</span>
    </span>

  )
}
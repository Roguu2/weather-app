import React, { ReactNode, useState } from 'react'

const LocationButton = ({
    title, icon, position, handleClick
}:{
    title: string; icon:React.ReactNode; position:string; handleClick?:(event: React.MouseEvent<HTMLButtonElement>)=> void
}) => {
  return (
    <div>
        <button className="relative inline-flex items-center justify-center h-12 gap-1 text-lg px-6 py-2 bg-[#4CBB17] text-white rounded-3xl font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleClick}>
          {position === 'left' && icon}
          {title}
          {position === 'right' && icon}
        </button>
    </div>
  )
}

export default LocationButton

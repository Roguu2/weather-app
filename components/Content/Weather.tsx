import React from 'react'

const Weather = ({
    
    weather, icon, location
}:{
    weather:string; location:string; icon:React.ReactNode
}) => {
  return (
        <div className='flex flex-col items-center col-span-2 row-span-2 h-full text-8xl'>
            {location === 'left' && (
                <div className='text-10xl'>{icon}</div>
            )}
            <p className='text-6xl'>{weather}</p>            
            {location === 'right' && (
                <div className='text-10xl'>{icon}</div>
            )}
        </div>
  )
}

export default Weather

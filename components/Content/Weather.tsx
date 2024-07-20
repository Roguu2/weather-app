import React from 'react'

const Weather = ({
    
    weather, icon, location
}:{
    weather:string; location:string; icon?:React.ReactNode
}) => {
  return (
        <div className='flex flex-col justify-center items-center h-full'>
            {location === 'left' && (
                <div className='text-8xl lg:text-9xl'>{icon}</div>
            )}
            <p className='text-2xl lg:text-5xl'>{weather}</p>            
            {location === 'right' && (
                <div className='text-9xl'>{icon}</div>
            )}
        </div>
  )
}

export default Weather

import React from 'react'

const WeatherStats = ({
    statName, stat, icon, position
}:{
    statName:string; stat:string; icon:React.ReactNode; position:string
}) => {
  return (
    <div className='flex lg:flex-col items-center justify-center h-[50%] w-[100%] text-sm lg:text-base gap-2 hover:scale-105 cursor-pointer mx-[10%] transition '>
      {position === 'left' && (
        <div className='flex items-center justify-center lg:text-6xl text-4xl'>{icon}</div>
      )}
      <div className='flex lg:flex-col items-center h-full w-[100%] lg:text-2xl'>
        <p className='mr-2'>{statName}</p>
        <p className='lg:text-center'>{stat}</p>
      </div>
      {position === 'right' && (
        <div className='text-6xl'>{icon}</div>
      )}  
    </div>
  )
}

export default WeatherStats

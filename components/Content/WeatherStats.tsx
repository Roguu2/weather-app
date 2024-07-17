import React from 'react'

const WeatherStats = ({
    statName, stat, icon, position
}:{
    statName:string; stat:string; icon:React.ReactNode; position:string
}) => {
  return (
    <div className='flex flex-col justify-center items-center text-1xl gap-2 hover:scale-105 cursor-pointer transition'>
      {position === 'left' && (
        <div className='text-7xl'>{icon}</div>
      )}
      <p>{stat}</p>
      <p>{statName}</p>
      {position === 'right' && (
        <div className='text-6xl'>{icon}</div>
      )}  
    </div>
  )
}

export default WeatherStats

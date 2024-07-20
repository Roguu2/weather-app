import React from 'react'

const WeatherStats = ({
  statName, stat, icon, position, className
}: {
  statName: string; stat: string; icon: React.ReactNode; position: string; className?:string
}) => {
  return (
    // <div className="flex lg:flex-col justify-center items-center h-1/2 w-full text-sm lg:text-base gap-2 hover:scale-105 cursor-pointer mx-10 transition">
    //   <div className="flex lg:flex-col justify-center items-center h-full lg:text-2xl lg:w-auto">
    //     {position === 'left' && (
    //       <div className="flex items-center justify-evenly lg:text-6xl text-4xl lg:w-auto">{icon}</div>
    //     )}
    //     <span className="flex-grow">{statName}</span>
    //     <span>{stat}</span>
    //   </div>
    //   {position === 'right' && (
    //     <div className="text-6xl">{icon}</div>
    //   )}
    // </div>
    <div className={`flex flex-col justify-center items-center h-1/2 w-full text-sm lg:text-base hover:scale-105 hover: cursor-pointer mx-10 transition ${className}`}>
      <span className="lg:text-6xl text-4xl lg:w-auto">{icon}</span>
      <span className="flex-grow lg:flex-none">{statName}</span>
      <span>{stat}</span>
  </div>
  )
}

export default WeatherStats

import React from 'react'

const SunriseSunset = ({
    content, time,  icon, position 
}:{
    content:string; time:number | string; icon:React.ReactNode; position:string
}) => {
  return (
        <div className='flex items-center justify-center h-[50%]'>
            {position === 'left' && (
                <div className='flex items-center justify-center  text-6xl'>{icon}</div>
            )}
            <div className='flex flex-col justify-center items-center h-full w-[50%] text-2xl'>
                <p className='text-3xl'>{content}</p> 
                <p className='font-semibold'>{time}</p>
            </div>
            {position === 'right' && icon}
        </div>
  )
}

export default SunriseSunset

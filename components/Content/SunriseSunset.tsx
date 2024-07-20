import React from 'react'

const SunriseSunset = ({
    content, time,  icon, position 
}:{
    content:string; time:number | string; icon:React.ReactNode; position:string
}) => {
  return (
        <div className='flex items-center justify-center h-[50%] w-[100%]'>
            {position === 'left' && (
                <div className='flex items-center justify-center lg:text-6xl text-4xl'>{icon}</div>
            )}
            <div className='flex lg:flex-col justify-center items-center h-full lg:text-2xl'>
                <p className='lg:text-3xl mr-2'>{content}</p> 
                <p className='font-semibold'>{time}</p>
            </div>
            {position === 'right' && icon}
        </div>
  )
}

export default SunriseSunset

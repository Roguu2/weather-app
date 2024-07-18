import React from 'react'

const Temp = ({
    temp, icon, position, feelsTemp
}:{
    temp?: number | string; feelsTemp?:number | string; icon?:React.ReactNode; position?:string;
}) => {
  return (
    <div className="flex flex-col p-3 gap-y-4 w-[100%]">
        <div className='flex items-center justify-center text-3xl lg:text-6xl'>
            {position === 'left' && icon}
            {temp}
            {position === 'right' && icon}
        </div>
        <div className='flex items-center justify-center text-base lg:text-4xl'>
            <p className='mr-1 text-center'>Feels like:</p>
            {position === 'left' && icon}
            {feelsTemp}
            {position === 'right' && icon}
        </div>
    </div>

  )
}

export default Temp

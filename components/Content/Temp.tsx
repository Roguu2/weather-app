import React from 'react'

const Temp = ({
    temp, icon, position, feelsTemp
}:{
    temp?: string; feelsTemp?:string; icon?:React.ReactNode; position?:string;
}) => {
  return (
    <div className="flex flex-col col-span-2">
        <div className='h-[50%] flex justify-center items-center text-7xl'>
            {position === 'left' && icon}
            {temp}
            {position === 'right' && icon}
        </div>
        <div className='h-[50%] flex justify-center items-start text-3xl'>
            <p className='mr-1 text-center'>Feels like:</p>
            {position === 'left' && icon}
            {feelsTemp}
            {position === 'right' && icon}
        </div>
    </div>

  )
}

export default Temp

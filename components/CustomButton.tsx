import Image from 'next/image'
import React from 'react'

const CustomButton = () => {
  return (
    <div className='flex-between h-10 bg-primary-100 px-4 rounded-[4px] cursor-pointer'>
          
          <Image
            src="/assets/icons/show_flights.svg"
            width={20}
            height={20}
            alt="show-flights"
          />

        <p
            className={`
                 ml-1
                font-inter 
                body-medium 
                text-dark-100
                dark:text-light-900 
                max-sm:hidden`}
          >
            Show Flights
          </p>
    </div>
  )
}

export default CustomButton
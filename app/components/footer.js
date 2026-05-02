'use client'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between items-center gap-5 px-5 pb-3 top-border pt-9 flex-wrap max-md:justify-center '>
      <p className='text-white font-sans text-sm max-md:text-center'>© 2025 Aisans Technologies. All Rights Reserved.</p>
      <img src="/microsoft.svg" alt="micro" width={'130px'} />
      <p className='text-white font-sans max-md:text-center'>Terms & Conditions | Privacy Policy</p>
    </div>
  )
}

export default Footer

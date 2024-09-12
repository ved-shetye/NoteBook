import React from 'react'
import loader from './loader.gif'

export default function Loader() {
  return (
    <div className='flex justify-center mb-4'>
      <img className='' src={loader} alt="..." />
    </div>
  )
}

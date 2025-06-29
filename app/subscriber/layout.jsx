import React from 'react'
import Subscriber_Header from '@/app/components/subscriber_components/subscriber_header'
export default function layout({ children }) {
  return (
    <div className=' mx-auto'>
      <Subscriber_Header />
      
      <div>{children}</div>
    </div>
  )
}

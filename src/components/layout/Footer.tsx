import Content from '../ui/Content'
import React from 'react'



export default function Footer() {

  return (

    <div 

        className='relative h-[300px]'

        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}

    >

        <div className='relative h-[calc(100vh+300px)] -top-[100vh]'>

            <div className='h-[300px] sticky top-[calc(100vh-300px)]'>
              <Content />
            </div>

        </div>

    </div>

  )

}
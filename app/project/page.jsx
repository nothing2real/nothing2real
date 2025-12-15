"use client"
import React from 'react'
import Footer from '../Components/Footer'
import { ReactLenis } from "@studio-freight/react-lenis"

const Page = () => {
  return (
    <ReactLenis root>
      <div className='bg-white w-full h-screen text-black xl:text-[8vw] '>
        <section className="w-full min-h-screen md:h-screen flex items-center justify-center">
          <h1 className='text-[15vw]'>Projects</h1>
        </section>

        <section className="w-full h-full bg-white ">
          <Footer />
        </section>
      </div>
    </ReactLenis>
  )
}

export default Page

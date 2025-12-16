"use client"

import Link from "next/link"
import bg from "../assets/cat-landing.png"
import bgMobile from "../assets/cat-landing-phone.png"
import Image from "next/image"
import { useState } from "react"
import { Fredoka, Poppins } from "next/font/google"
import ChristmasBackground from "@/components/ChristmasBackground"
import ClickSnowEffect from "@/components/ClickSnowEffect"
import ExampleModal from "@/components/ExampleModal"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
})

export default function Page() {

  const isClient = typeof window !== "undefined"
  const [isExampleOpen, setIsExampleOpen] = useState(false)

  return (
    <div className="h-svh md:h-screen relative bg-[#182d09] overflow-hidden">
      <ChristmasBackground />
      <ClickSnowEffect />
      <div className="relative z-10 mt-[8svh] md:mt-[100px] px-[5vw] md:px-0 md:ml-[80px] w-full md:w-auto text-center md:text-left">
      <h1
          className={`text-[12vw] md:text-8xl font-bold mb-[0svh] outline-white text-[#fde9de] ${fredoka.className}`}
        >
          Christmas
        </h1>
        <h2
          className={`text-[10vw] md:text-7xl font-bold mb-[3.5svh] text-[#fde9de] leading-[0.9] md:leading-normal ${fredoka.className}`}
        >
          Digital Card Generator
        </h2>
        <p
          className={`text-[5vw] md:text-3xl max-w-3xl leading-relaxed text-[#fde9de] ${poppins.className}`}
        >
          {/* <span>Your potential valentine deserves more than a DM.</span> */}
          <span className="inline md:hidden">&nbsp;</span>
          <br className="hidden md:block" />
          <span>Enter details, choose a card, and get a link.</span>
          <span className="inline md:hidden">&nbsp;</span>
          <br className="hidden md:block" />
          <span>No coding required.</span>
        </p>
      </div>

      <div className="relative z-10 mt-[4.5svh] md:mt-[7svh] px-[5vw] flex gap-[4vw] md:justify-normal justify-center">
      <Link href="/form">
          <button
            className={`bg-[#8e3329] text-white font-bold text-[5vw] md:text-4xl py-[2svh] md:py-8 px-[5vw] md:px-[60px] rounded-full whitespace-nowrap 
            z-30 relative cursor-pointer
            transition-shadow duration-200 ease-in-out hover:shadow-[0_0_20px_rgba(217,143,143,0.8)]
            ${fredoka.className}`}
          >
            Create Card
          </button>
        </Link>

        {/* <button
          onClick={() => setIsExampleOpen(true)}
          className={`bg-[#d2c4aa] text-white font-bold text-[5vw] md:text-4xl py-[2svh] md:py-8 px-[5vw] md:px-[60px] rounded-full whitespace-nowrap 
          z-30 relative cursor-pointer
          transition-shadow duration-200 ease-in-out hover:shadow-[0_0_20px_rgba(217,143,143,0.8)]
          ${fredoka.className}`}
        >
          See Example
        </button> */}
      </div>

      <ExampleModal 
        isOpen={isExampleOpen}
        onClose={() => setIsExampleOpen(false)}
      />

      <Image
        src={bg}
        alt="Background"
        className="hidden md:block absolute bottom-[-11%] right-[0.75%] w-screen h-auto object-contain z-0"
        priority
      />
      <Image
        src={bgMobile}
        alt="Background"
        className="md:hidden absolute bottom-[-8%] right-0 w-full h-auto object-contain z-0"
        priority
      />
    </div>
  )
}

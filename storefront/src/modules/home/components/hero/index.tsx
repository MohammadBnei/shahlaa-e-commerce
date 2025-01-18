"use client"

import Image from "next/image"

const Hero = () => {
  return (
    <div className="w-full relative border-b border-ui-border-base">
      <video
        width="100%"
        height="auto"
        loop
        muted
        autoPlay
        src="/content/home-page.mp4"
        className="w-full h-auto md:hidden"
      ></video>
      <div className="hidden md:block">
        <video
          width="100%"
          height="auto"
          loop
          muted
          autoPlay
          src="/content/home-page.mp4"
        ></video>
      </div>
    </div>
  )
}

export default Hero

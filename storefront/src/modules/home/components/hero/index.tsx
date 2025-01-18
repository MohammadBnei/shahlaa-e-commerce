"use client"

import Image from "next/image"

const Hero = () => {
  return (
    <div className="w-full relative border-b border-ui-border-base">
      <Image
        src="/content/home.jpg"
        alt="ChezScheyda Hero"
        width={2000}
        height={1333}
        className="w-full h-auto md:hidden"
        priority
        quality={90}
      />
      <div className="hidden md:block h-[calc(100vh-4rem)]">
        <Image
          src="/content/home.jpg"
          alt="ChezScheyda Hero"
          fill
          className="object-fill"
          priority
          quality={90}
        />
      </div>
    </div>
  )
}

export default Hero

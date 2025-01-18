"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <>
      <div className="flex flex-col gap-y-4 small:mx-8 max-w-[800px]">
        {/* Main carousel */}
        <div className="overflow-hidden rounded-lg" ref={emblaMainRef}>
          <div className="flex touch-pan-y">
            {images.map((image, index) => (
              <div
                className="relative aspect-square small:aspect-[4/3] min-w-0 flex-[0_0_100%]"
                key={image.id}
              >
                {image.url && (
                  <div 
                    className="relative w-full h-full cursor-zoom-in"
                    onClick={() => setShowModal(true)}
                  >
                    <Image
                      src={image.url}
                      priority={index <= 2}
                      className="rounded-lg p-2 small:p-4"
                      alt={`Product image ${index + 1}`}
                      fill
                      sizes="(max-width: 576px) 100vw, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnail carousel */}
        <div className="overflow-hidden px-2 small:px-4" ref={emblaThumbsRef}>
          <div className="flex gap-2 justify-center">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => onThumbClick(index)}
                className={`relative aspect-square w-14 small:w-16 flex-[0_0_auto] cursor-pointer overflow-hidden rounded-md transition-all duration-200 ${
                  index === selectedIndex ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black' : ''
                }`}
                type="button"
              >
                {image.url && (
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && images[selectedIndex]?.url && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <button 
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-white z-50 p-2"
            aria-label="Close modal"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="stroke-current"
            >
              <path 
                d="M18 6L6 18M6 6l12 12" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="w-screen h-screen flex items-center justify-center">
            <Image
              src={images[selectedIndex].url}
              alt={`Full size product image ${selectedIndex + 1}`}
              fill
              quality={100}
              className="object-contain p-4"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery

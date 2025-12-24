"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    alt: "Desenvolvimento de site de comércio eletrônico - 2019-2020",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    alt: "Sistema de gerenciamento de conteúdo - 2020-2021",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    alt: "Site de vendas com carrinho de compras - 2021-2022",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    alt: "Sistema de gerenciamento de projetos - 2023-Presente",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
    alt: "Projetos futuros e inovações",
  },
]

export function HorizontalImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400 // ms between navigations

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      navigate(1)
    } else if (info.offset.x > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 30) {
        if (e.deltaX > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate],
  )

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 5, rotateY: 0 }
    } else if (diff === -1) {
      return { x: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateY: 8 }
    } else if (diff === -2) {
      return { x: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateY: 15 }
    } else if (diff === 1) {
      return { x: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateY: -8 }
    } else if (diff === 2) {
      return { x: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateY: -15 }
    } else {
      return { x: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateY: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden bg-background py-12">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.02] blur-3xl" />
      </div>

      {/* Card Stack */}
      <div className="relative flex h-[420px] w-[500px] items-center justify-center" style={{ perspective: "1200px" }}>
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                rotateY: style.rotateY,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-card ring-1 ring-border/20"
                style={{
                  boxShadow: isCurrent
                    ? "0 25px 50px -12px hsl(var(--foreground) / 0.15), 0 0 0 1px hsl(var(--foreground) / 0.05)"
                    : "0 10px 30px -10px hsl(var(--foreground) / 0.1)",
                }}
              >
                {/* Card inner glow - uses foreground with low opacity */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-foreground/10 via-transparent to-transparent" />

                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover w-full h-full"
                  draggable={false}
                  priority={isCurrent}
                />

                {/* Side gradient overlay - uses background color */}
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background/60 to-transparent" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots - horizontal */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-row gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-foreground" : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 text-foreground transition-all hover:bg-background hover:scale-110 z-10"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => navigate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 text-foreground transition-all hover:bg-background hover:scale-110 z-10"
        aria-label="Próximo"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Instruction hint */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-row items-center gap-2 text-muted-foreground">
          <motion.div
            animate={{ x: [-8, 0, -8] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.div>
          <span className="text-xs font-medium tracking-widest uppercase">Scroll ou arraste</span>
          <motion.div
            animate={{ x: [8, 0, 8] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.div>

      {/* Counter */}
      <div className="absolute left-4 top-4">
        <div className="flex flex-row items-center">
          <span className="text-4xl font-light text-foreground tabular-nums">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="mx-2 h-8 w-px bg-foreground/20" />
          <span className="text-sm text-muted-foreground tabular-nums">{String(images.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}


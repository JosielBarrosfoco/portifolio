import { HorizontalImageStack } from "@/components/ui/horizontal-image-stack"
import AnimatedShaderBackground from "@/components/ui/animated-shader-background"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background relative">
      {/* Header com Theme Toggle */}
      <Header />
      
      {/* Hero Section com Background Paths - Efeito visual impactante */}
      <section id="home" data-section="home" className="relative z-50 w-full pt-16">
        <BackgroundPaths title="Josiel Barros Desenvolvedor" />
      </section>
      
      {/* Background animado com shader - movido para baixo */}
      <div className="relative z-0">
        <AnimatedShaderBackground />
      </div>
      
      {/* Seção de Experiência com o componente horizontal */}
      <section className="py-16 px-4 relative z-10" id="experience" data-section="experience">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
              Experiencia
            </span>
            <h2 className="text-4xl font-bold text-foreground">
              Minha experiência
            </h2>
          </div>
          
          {/* Componente Horizontal de Imagens das Experiências */}
          <div className="w-full">
            <HorizontalImageStack />
          </div>
        </div>
      </section>
    </main>
  )
}

"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  Workflow,
  BarChart3,
  ShieldCheckIcon,
  Users2,
  Puzzle,
  HeadsetIcon,
  Building2,
  DollarSign,
} from "lucide-react"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/home/footer"
import { Preloader } from "@/components/home/preload"

const blink = {
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0 },
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TypeWriter from "@/components/home/type-writer"

export default function Home() {
  const router = useRouter()
  const targetRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const gridX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  })
  const gridY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(((e.clientX - centerX) / centerX) * 20)
      mouseY.set(((e.clientY - centerY) / centerY) * 20)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const projectsCount = 1233
  const deploymentCount = 5678
  const securityCount = 99

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div ref={targetRef} className="min-h-screen bg-transparent text-white overflow-hidden select-none">
      <Preloader />
      <motion.div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <motion.div
          className="absolute inset-0"
          style={{
            // "@keyframes blink": blink,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)",
            x: gridX,
            y: gridY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10">
        <motion.section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 sm:py-16 lg:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-[90%] sm:max-w-3xl mx-auto space-y-6 sm:space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-2"
            >
              <span className="bg-white text-black px-2">Gestor</span>
              <span className="flex items-center">
                <TypeWriter text="Ideas SAC" delay={150} />
                <span className="w-[2px] h-[1em] bg-white animate-[blink_1s_ease-in-out_infinite]" />
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4"
            >
              La forma más rápida y eficiente de gestionar, organizar y desarrollar tus ideas de negocio con la ayuda de IA
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto mt-4 sm:mt-8 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out text-base px-6 py-4 h-auto bg-transparent"
                onClick={() => router.push("/auth/login")}
              >
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto mt-4 sm:mt-8 bg-white text-black border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out text-base px-6 py-4 h-auto"
                onClick={() => router.push("/agendar")}
              >
                Agende una reunión
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mx-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              >
                Nuestro Impacto en Números
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base"
              >
                Descubre cómo transformamos ideas en negocios exitosos
              </motion.p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 text-center"
              >
                <Users2 className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-4 mx-auto" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{projectsCount.toLocaleString()}</div>
                <p className="text-gray-400 text-sm sm:text-base">Ideas Gestionadas</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 text-center"
              >
                <Building2 className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-4 mx-auto" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  {deploymentCount.toLocaleString()}
                </div>
                <p className="text-gray-400 text-sm sm:text-base">Proyectos Exitosos</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 text-center"
              >
                <DollarSign className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-4 mx-auto" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  ${(securityCount * 100000).toLocaleString()}
                </div>
                <p className="text-gray-400 text-sm sm:text-base">Ingresos Generados</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <motion.section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-4">
                Potentes características para tu negocio
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
                Todo lo necesario para hacer crecer tu negocio y satisfacer a tus clientes
              </motion.p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div key={feature.title} variants={itemVariants} custom={index}>
                  <Card
                    role="button"
                    tabIndex={0}
                    className="p-4 sm:p-6 bg-transparent backdrop-blur-2xl border-gray-500 text-white blur-[0.4px] transition-transform duration-300 hover:scale-105 cursor-pointer h-full"
                  >
                    <feature.icon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Precios simples y transparentes
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                Elige el plan perfecto para tus necesidades. Siempre sabrás lo que pagarás.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Free Plan */}
              <motion.div variants={itemVariants}>
                <Card className="relative p-4 sm:p-6 bg-transparent backdrop-blur-2xl border-gray-500 text-white h-full">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-bold">Gratis</CardTitle>
                    <p className="text-gray-400 text-sm sm:text-base">Ideal para comenzar</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-2xl sm:text-4xl font-bold">$0</span>
                      <span className="text-gray-400 ml-2 text-sm sm:text-base">/ month</span>
                    </div>
                    <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Gestor básico de ideas
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Análisis de mercado básico
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Soporte por correo electrónico
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => router.push("/register")}
                      className="w-full border-2 border-white text-sm sm:text-lg py-4 sm:py-6 px-4 sm:px-8 text-black bg-white hover:bg-transparent hover:text-white transition-all duration-300"
                    >
                      Comience
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Pro Plan */}
              <motion.div variants={itemVariants}>
                <Card className="relative p-4 sm:p-6 bg-transparent backdrop-blur-2xl border-gray-500 text-white h-full">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-bold">Pro</CardTitle>
                    <p className="text-gray-400 text-sm sm:text-base">Para equipos en crecimiento</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-2xl sm:text-4xl font-bold">$4.99</span>
                      <span className="text-gray-400 ml-2 text-sm sm:text-base">/ month</span>
                    </div>
                    <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Todas las funciones gratuitas
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Gestión avanzada de ideas
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Análisis de mercado detallado
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Soporte prioritario
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        const userData = localStorage.getItem("userData")
                        if (userData) {
                          router.push("/payment?plan=pro")
                        } else {
                          router.push("/login?redirect=/payment?plan=pro")
                        }
                      }}
                      className="w-full border-2 border-white text-sm sm:text-lg py-4 sm:py-6 px-4 sm:px-8 text-black bg-white hover:bg-transparent hover:text-white transition-all duration-300"
                    >
                      Actualice a Pro
                      <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Premium Plan */}
              <motion.div variants={itemVariants}>
                <Card className="relative p-4 sm:p-6 bg-transparent backdrop-blur-2xl border-gray-500 text-white h-full">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-black text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                      Más popular
                    </span>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-bold">Premium</CardTitle>
                    <p className="text-gray-400 text-sm sm:text-base">Para usuarios avanzados</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-2xl sm:text-4xl font-bold">$29.99</span>
                      <span className="text-gray-400 ml-2 text-sm sm:text-base">/ month</span>
                    </div>
                    <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Todas las funciones Pro
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Análisis de competencia
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Solicitudes y sugerencias avanzadas
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Soporte prioritario 24/7
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                        Gerente de cuenta personal
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        const userData = localStorage.getItem("userData")
                        if (userData) {
                          router.push("/payment?plan=premium")
                        } else {
                          router.push("/login?redirect=/payment?plan=premium")
                        }
                      }}
                      className="w-full border-2 border-white text-sm sm:text-lg py-4 sm:py-6 px-4 sm:px-8 text-black bg-white hover:bg-transparent hover:text-white transition-all duration-300"
                    >
                      Obtenga Premium
                      <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <Footer />
      </div>
    </div>
  )
}

const features = [
  {
    title: "Gestión de Ideas",
    description: "Organiza y desarrolla tus ideas de negocio con nuestra plataforma impulsada por IA.",
    icon: Workflow,
  },
  {
    title: "Análisis de Mercado",
    description: "Obtén información detallada sobre tendencias del mercado y oportunidades de negocio.",
    icon: BarChart3,
  },
  {
    title: "Seguridad de Datos",
    description: "Tus ideas y datos de negocio siempre están protegidos y encriptados.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Colaboración en Equipo",
    description: "Trabaja en equipo de manera eficiente para desarrollar tus ideas de negocio.",
    icon: Users2,
  },
  {
    title: "Integración de Herramientas",
    description: "Conecta sin problemas con tus herramientas favoritas de gestión y productividad.",
    icon: Puzzle,
  },
  {
    title: "Soporte Experto",
    description: "Recibe ayuda para tu estrategia de negocio de nuestro equipo especializado.",
    icon: HeadsetIcon,
  },
]

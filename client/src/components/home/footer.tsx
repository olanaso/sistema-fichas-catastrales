import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-500 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-lg sm:text-xl font-semibold flex items-center gap-1">
            <span className="bg-white text-black px-2">Gestor</span>
            <span className="text-white">Ideas SAC</span>
          </span>
        </div>

        <div className="flex gap-4 sm:gap-6 text-gray-400 text-sm sm:text-base">
          <Link href="#" className="hover:text-white transition-colors">
            Términos
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Privacidad
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}

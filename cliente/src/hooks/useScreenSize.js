import { useState, useEffect } from 'react'

// Breakpoints de Bootstrap
const BREAKPOINTS = {
    xs: 0,      // Extra small devices (portrait phones, less than 576px)
    sm: 576,    // Small devices (landscape phones, 576px and up)
    md: 768,    // Medium devices (tablets, 768px and up)
    lg: 992,    // Large devices (desktops, 992px and up)
    xl: 1200,   // Extra large devices (large desktops, 1200px and up)
    xxl: 1400   // Extra extra large devices (larger desktops, 1400px and up)
}

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        isXs: window.innerWidth < BREAKPOINTS.sm,
        isSm: window.innerWidth >= BREAKPOINTS.sm && window.innerWidth < BREAKPOINTS.md,
        isMd: window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg,
        isLg: window.innerWidth >= BREAKPOINTS.lg && window.innerWidth < BREAKPOINTS.xl,
        isXl: window.innerWidth >= BREAKPOINTS.xl && window.innerWidth < BREAKPOINTS.xxl,
        isXxl: window.innerWidth >= BREAKPOINTS.xxl,
        isMobile: window.innerWidth < BREAKPOINTS.md,
        isTablet: window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg,
        isDesktop: window.innerWidth >= BREAKPOINTS.lg,
        breakpoint: getBreakpoint(window.innerWidth)
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            
            setScreenSize({
                width,
                height,
                isXs: width < BREAKPOINTS.sm,
                isSm: width >= BREAKPOINTS.sm && width < BREAKPOINTS.md,
                isMd: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
                isLg: width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl,
                isXl: width >= BREAKPOINTS.xl && width < BREAKPOINTS.xxl,
                isXxl: width >= BREAKPOINTS.xxl,
                isMobile: width < BREAKPOINTS.md,
                isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
                isDesktop: width >= BREAKPOINTS.lg,
                breakpoint: getBreakpoint(width)
            })
        }

        // Establecer tamaño inicial
        handleResize()

        // Escuchar cambios de tamaño
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return screenSize
}

// Función auxiliar para obtener el breakpoint actual
function getBreakpoint(width) {
    if (width >= BREAKPOINTS.xxl) return 'xxl'
    if (width >= BREAKPOINTS.xl) return 'xl'
    if (width >= BREAKPOINTS.lg) return 'lg'
    if (width >= BREAKPOINTS.md) return 'md'
    if (width >= BREAKPOINTS.sm) return 'sm'
    return 'xs'
}

export default useScreenSize
export { BREAKPOINTS } 
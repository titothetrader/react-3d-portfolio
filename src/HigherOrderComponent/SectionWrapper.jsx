import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { staggerContainer } from '../utils/motion'


const SectionWrapper = (Component, idName) => 
    function HOC() {
        const [isMobile, setIsMobile] = useState(false)
        useEffect(() => {
            // add listener for changes to screen size
            const mediaQuery = window.matchMedia('(max-width: 760px)')

            // set initial value
            setIsMobile(mediaQuery.matches)

            // define callback for media query
            const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches)
            }

            // add calback as a listener to execute when changes detected
            mediaQuery.addEventListener('change', handleMediaQueryChange)

            // remove the listener when the component is unmounted
            return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
            }
        }, [])

        return (
            <motion.section
                variants={staggerContainer()}
                initial={`${isMobile ? 'false' : 'hidden'}`}
                whileInView="show"
                // viewport={{ once: true, amount: 0.25 }}
                viewport={{ once: true }}
                className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
                id={idName}
            >
                <span className='hash-span' id={idName}>&nbsp;</span>
                <Component />
            </motion.section>
        )
    }

export default SectionWrapper
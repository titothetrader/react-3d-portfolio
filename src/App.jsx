import { useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"

import { About, Contact, Experience, Testimonials, Hero, Navbar, Tech, Projects, StarsCanvas } from './components'

const App = () => {
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
  })

  return (
    <BrowserRouter>
    <Navbar />
      <div className="relative z-0 bg-primary">
        <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
          <Hero isMobile={isMobile}/>
        </div>
        <About />
        <Tech />
        <Experience isMobile={isMobile} />
        <Projects />
        <Testimonials />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

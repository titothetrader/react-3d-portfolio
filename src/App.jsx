import { BrowserRouter } from "react-router-dom"

import { About, Contact, Experience, Testimonials, Hero, Navbar, Tech, Projects, StarsCanvas } from './components'

const App = () => {

  return (
    <BrowserRouter>
    <Navbar />
      <div className="relative z-0 bg-primary">
        <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
          <Hero />
        </div>
        <About />
        <Tech />
        <Experience />
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

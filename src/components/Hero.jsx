import { motion } from 'framer-motion'

import { styles } from '../styles'
import { ModelCanvas } from './canvas'

const Hero = (props) => {

  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col items-center justify-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#2f80ed]'/>
          <div className='w-1 h-40 sm:h-80 blue-gradient'/>
        </div>
        <div>
            <h1 className={`${styles.heroHeadText} text-white`}><span></span>Tensai.<span className='text-[#2f80ed]'>Digital</span></h1>
            <span className={`${styles.heroSubText} mt-2 text-white-100`}>
            <motion.p
              key={"ninjaneer"}
              initial={{ 
                opacity: 0,
                // y: -50,
                x: -50
              }}
              animate={{ 
                opacity: 1,
                y: 0,
                x: 0
              }}
              transition={{
                duration: 3,
                delay: 3
              }}
            >
              🥷 Software Ninjaneer<br /></motion.p>
              📜 Certified in MIT DSML, Agile, ITIL, SixSigma<br/>
              🦉 Senior Developer, Project Manager and ITSM Team Lead <br />
              🔥 Passion for mind studies, trading, 3D web and Blockchain<br /> 
              🗺️ From collaborative business planning to technical implementation
            </span>
          </div>
      </div>

      <ModelCanvas isMobile={props.isMobile} />
      
      <div className='absolute flex items-center justify-center w-full xs:bottom-24 bottom-36'>
        <a href="#about">
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className='w-3 h-3 mb-1 rounded-full bg-secondary'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero
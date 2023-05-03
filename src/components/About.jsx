import React, { useEffect, useState } from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'

import { styles } from '../styles'

import { fadeIn, textVariant } from '../utils/motion'

import SectionWrapper from '../HigherOrderComponent/SectionWrapper'
import { fetchAboutData } from '../services/fetchDataFromDB'

const ServiceCard = (service) => {
  
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * service.index, 1)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        {/* Div with TILT options */}
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img 
            src={service.icon} 
            alt={service.title}
            className='object-contain w-16 h-16' 
            referrerPolicy="no-referrer"
          />
            <h3 className='text-white text-[20px] font-bold text-center'>{service.title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  const [profileData, setProfileData] = useState({
    summary: '',
    services: [],
  })

  useEffect(() => {
    fetchAboutData()
      .then(response => 
        setProfileData({
          summary: response.summary,
          services: JSON.parse(response.services)
        })
      )
      .catch(err => console.log(err))    
    // console.log(JSON.parse(results.rows[0].experiences))
  }, [])


  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px]  leading-[30px]'
      >
        {profileData?.summary}
      </motion.p>

      <div className='flex flex-wrap justify-center gap-10 mt-20'>
        {profileData?.services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service}/>
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")

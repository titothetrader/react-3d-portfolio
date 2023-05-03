import { motion } from "framer-motion"

import { styles } from "../styles"
import { fadeIn, textVariant } from "../utils/motion"

import SectionWrapper from '../HigherOrderComponent/SectionWrapper'
import { fetchTestimonialsData } from "../services/fetchDataFromDB"
import { useEffect, useState } from "react"

const TestimonialCard = (testimonial) => (
  <motion.div 
    variants={fadeIn("", "spring", 0.5 * testimonial.index, 0.75)}
    className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
  >
    <p className="text-white font-black text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px]">{testimonial.testimonial}</p>

      <div className="flex items-center justify-between gap-1 mt-7">
        <div className="flex flex-col flex-1">
          <p className="text-white font-medium text-[16px]"><span className="blue-text-gradient">@</span> {testimonial.name}</p>
          <p className="mt-1 text-secondary text-[12px]">{testimonial.designation} of {testimonial.company}</p>
        </div>
        <img 
          src={testimonial.image} 
          alt={`feedback by ${testimonial.company}`}
          className="object-contain w-10 h-10 rounded-full"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </motion.div>
)

const Testimonials = () => {
  const [profileData, setProfileData] = useState({
    testimonials: []
  })

  useEffect(() => {
    fetchTestimonialsData().then(response => {
      setProfileData({
        testimonials: JSON.parse(response.testimonials)
      })
    })
  }, [])

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>A few kind words</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      
      <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-7 justify-center`}>
        {profileData?.testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Testimonials, "testimonials")
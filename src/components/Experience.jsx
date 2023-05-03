import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import 'react-vertical-timeline-component/style.min.css'

import { motion } from "framer-motion"

import { textVariant, dropDown } from "../utils/motion"
import { styles } from "../styles"
import SectionWrapper from '../HigherOrderComponent/SectionWrapper'
import { useEffect, useState } from "react"
import { fetchExperiencesData } from "../services/fetchDataFromDB"

function NewlineText(props) {
  const text = props.text;
  return (
    <motion.div
      variants={dropDown}
      animate={props.isHovered ? "open" : "closed"}
    >
    <ul className="mt-5 ml-5 space-y-2 list-disc transition-all duration-1000">
      {text.split('\n').map((str, index) => (
        <li 
          key={index}
          className="text-white-100 text-[14px] pl-1 tracking-wider"
        >
          {str}
        </li>
      ))}
    </ul>
    </motion.div>
  )
}

const ExperienceCard = ({ experience }) => {
  const startDate = new Date(experience.starts_at.year, experience.starts_at.month -1, experience.starts_at.day)
  const startMonth = startDate.toLocaleString('default', { month: 'short' })

  const endDate = new Date(experience.ends_at.year, experience.ends_at.month -1, experience.ends_at.day)
  const endMonth = endDate.toLocaleString('default', { month: 'short' })

  const [isHovered, setIsHovered] = useState(false);

  return (
  <VerticalTimelineElement
    contentStyle={{ background: '#1d1836', color: '#fff'}}
    contentArrowStyle={{ borderRight: '7px solid #232631'}}
    date={<span className={styles.sectionSubText} style={{ fontSize: '14px'}}>{startMonth} / {experience.starts_at.year} - {!experience.ends_at.year ? 'current' : `${endMonth} / ${experience.ends_at.year}`}</span>}
    icon={
    <div>
      <img 
        src={experience.logo_url}
        alt={experience.company}
        className="object-contain w-full h-full rounded-full"
        referrerPolicy="no-referrer"
      />
    </div>
  }
  >
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <span className={styles.sectionSubText}>{experience.company}</span>
      <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
      <NewlineText isHovered={isHovered} text={experience.description}/>
    </motion.div>
  </VerticalTimelineElement>
  )
}

const Experience = () => {
  const [profileData, setProfileData] = useState({
    experiences: [],
  })

  useEffect(() => {
    fetchExperiencesData()
      .then(response => {
        setProfileData({
          experiences: JSON.parse(response.experiences)
        })}
      )
      .catch(err => console.log(err))    
    // console.log(JSON.parse(results.rows[0].experiences))
  }, [])

  return (
    <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Where I've played at</p>
      <h2 className={styles.sectionHeadText}>Work Experience.</h2>
    </motion.div> 

    <div className="flex flex-col mt-20">
      <VerticalTimeline>
        {profileData?.experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </VerticalTimeline>
    </div>
    </>
  )
}

export default SectionWrapper(Experience, "experience")
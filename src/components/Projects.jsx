import { Tilt } from "react-tilt"
import { motion } from "framer-motion"

import { fadeIn, textVariant } from "../utils/motion"
import { github, linkBW, youtube } from "../assets"
import { styles } from '../styles'

import SectionWrapper from '../HigherOrderComponent/SectionWrapper'
import { useEffect, useState } from "react"
import { fetchProjectsData } from "../services/fetchDataFromDB"

const ProjectCard = (project) => (
  <motion.div variants={fadeIn("up", "spring", project.index * 0.5, 0.75)}>
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450
      }}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
    >
      <div className="relative w-full h-[230px]">
        <img 
          src={project.image}
          alt={project.name}
          className="object-cover w-full h-full rounded-2xl"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <div
            onClick={() => window.open(project.link ? project.link : project.github !== "" ? project.github : project.youtube ? project.youtube : '', "_blank")}
            className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer black-gradient"
          >
            <img 
              src={ project.link ? linkBW : project.github !== "" ? github : project.youtube ? youtube : ''}
              alt={project.name}
              className="object-contain w-1/2 h-1/2"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div> 
      
      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{project.name}</h3>
        <p className="mt-2 text-secondary text-[14px]">{project.description}</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag, index) => 
          <p key={index} className={`text-[14px] ${tag.color}`}>#{tag.name}</p>
        )}
      </div>
    </Tilt>
  </motion.div>
)

const Projects = () => {
  const [profileData, setProfileData] = useState({
    projects: []
  })

  useEffect(() => {
    fetchProjectsData().then(response => {
      setProfileData({
        projects: JSON.parse(response.projects)
      })
    })
  }, [])

  return (
    <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Toys I've made</p>
      <h2 className={styles.sectionHeadText}>Projects.</h2>
    </motion.div>

    <div className="flex w-full">
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        The projects below showcase some experiences through real world examples of my work. Each project has a brief description with a link to its corresponding demo or code. It reflects the ability to solve complex problems using different technologies and manage them effectively.
      </motion.p>
    </div>

    <div className="flex flex-wrap justify-center mt-20 gap-7">
      {profileData?.projects.map((project, index) => (
        <ProjectCard 
          key={`project-${index}`} 
          index={index}
          {...project}
        />
      ))}
    </div>
    </>
  )
}

export default SectionWrapper(Projects, 'projects')
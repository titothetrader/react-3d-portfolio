import { BallCanvas } from "./canvas"
import { SectionWrapper } from '../HigherOrderComponent'
import { technologies } from "../constants"

import { useEffect, useState } from "react"
import { fetchTechnologiesData } from "../services/fetchDataFromDB"

const Tech = ({ isMobile }) => {
    const [profileData, setProfileData] = useState({
    technologies: []
  })

  useEffect(() => {
    fetchTechnologiesData()
      .then(response => 
        setProfileData({
          technologies: JSON.parse(response.technologies)
        })
      )
      .catch(err => console.log(err))    
    // console.log(JSON.parse(results.rows[0].experiences))
  }, [])

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
        <div className="flex justify-between w-full h-[500px]" >
          <BallCanvas technologies={technologies} />
        </div>
    </div>
  )
}

export default SectionWrapper(Tech, "tech")



import { BallCanvas } from "./canvas"
import { SectionWrapper } from '../HigherOrderComponent'
import { technologies } from "../constants"

import { useEffect, useState } from "react"
import { fetchTechnologiesData } from "../services/fetchDataFromDB"

const Tech = () => {
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
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {/* {technologies.map((technology, index) => ( */}
        <div className="flex justify-between w-full h-[500px]" >
          <BallCanvas technologies={technologies} isMobile={isMobile} />
        </div>
      {/* ))} */}
    </div>
  )
}

export default SectionWrapper(Tech, "tech")


  // const [profileData, setProfileData] = useState({
  //   technologies: []
  // })

  // useEffect(() => {
  //   fetchTechnologiesData()
  //     .then(response => 
  //       setProfileData({
  //         technologies: JSON.parse(response.technologies)
  //       })
  //     )
  //     .catch(err => console.log(err))    
  //   // console.log(JSON.parse(results.rows[0].experiences))
  // }, [])
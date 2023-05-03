import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { styles } from '../styles'
import { navLinks } from '../constants'
import { menu, close } from '../assets'

const Navbar = () => {

  const [active ,setActive] = useState('')
  const [toggle ,setToggle] = useState(false)
  
  const ListMenu = (props) => {
    return (
      <ul className={props.customClass}>
        {navLinks.map((link) => (
          <li 
            key={link.id}
            className={`${active === link.title ? 'text-white' : 'text-secondary'} hover:text-white sm:text-xl font-medium cursor-pointer font-poppins text-sm`}
            onClick={() => {
              setActive(link.title)
              setToggle(!toggle)
            }}
          >
            <a href={`#${link.id}`}>{link.title}</a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <nav
      className={`sticky top-0 ${styles.paddingX} w-full flex items-center py-5 bg-fixed z-20 bg-primary`}  
    >
      <div className='flex items-center justify-between w-full mx-auto max-w-7xl'>
        <Link 
          to="/" 
          className='flex items-center gap-2'
          onClick={() => {
            setActive("")
            window.scrollTo(0,0)
          }}
        >
          <img src="https://tensai.nyc3.cdn.digitaloceanspaces.com/web-tensai/Tensai-logo-symbol-150.png" alt='logo' className='object-contain w-9 h-9'></img>
          <p className='flex text-xl font-bold text-white cursor-pointer'>Tensai.<span className='text-[#2f80ed]'>Digital</span> <span className='hidden sm:block'>&nbsp;| Solutions</span></p>
        </Link>
        <ListMenu customClass='list-none hidden sm:flex flex-row gap-10' />
        <div className='flex items-center justify-end flex-1 sm:hidden'>
            <img 
              src={!toggle ? menu : close } 
              alt="menu"
              className='w-[28px] h-[28px] cursor-pointer object-contain'
              onClick={() => setToggle(!toggle)}
            />
            <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 mx-4 right-0  min-w-[140px] z-10 rounded-xl`}>
            <ListMenu customClass='list-none flex justify-end items-start flex-col gap-4' />
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
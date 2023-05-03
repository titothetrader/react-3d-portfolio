import { connect } from '@planetscale/database'

const config = {
    host: import.meta.env.VITE_DB_HOST,
    username: import.meta.env.VITE_DB_USERNAME,
    password: import.meta.env.VITE_DB_PASSWORD
  }

export const fetchAboutData = async () => {
      const conn = connect(config)
      const results = await conn.execute('SELECT summary, services FROM linkedin_profile')

      return results.rows[0]
  }

export const fetchExperiencesData = async () => {
    const conn = connect(config)
    const results = await conn.execute('SELECT experiences FROM linkedin_profile')

    return results.rows[0]
}

export const fetchTechnologiesData = async () => {
    const conn = connect(config)
    const results = await conn.execute('SELECT technologies FROM linkedin_profile')

    return results.rows[0]
}

export const fetchProjectsData = async () => {
    const conn = connect(config)
    const results = await conn.execute('SELECT projects FROM linkedin_profile')

    return results.rows[0]
}

export const fetchTestimonialsData = async () => {
    const conn = connect(config)
    const results = await conn.execute('SELECT testimonials FROM linkedin_profile')

    return results.rows[0]
}


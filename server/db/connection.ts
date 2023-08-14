import knex from 'knex'
import config from './knexfile.js'

export type Environment = 'development' | 'test' | 'production'
const environment = (process.env.NODE_ENV || 'development') as Environment

const connection = knex(config[environment])

export default connection

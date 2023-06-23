import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

class Database{
  public async database() {
    const connection = await mysql.createConnection(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`)
    if(!connection) {
      console.log("Deu ruim!")
    }
  
    return connection
  }
}

export default new Database()
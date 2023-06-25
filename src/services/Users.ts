import Database from '../database/dbconfig'
import knex from '../database/knex'
import bcrypt from "bcrypt"

// const database = new App().database
type User = {
  id: number
  username: string
  password: string
}

class Users {
  public async login(user: string): Promise<any>{
    try {
      const res = await (await Database.database()).query(`SELECT * FROM users WHERE username = '${user}'`)
      if(!res) {
        console.log("Não foi possível fazer a requisição!")
        return new Error("usuario não encontrado")
      }
      return await res[0]
    } catch (error) {
      console.log(error)
    }
  }

  public async listUser (){
    try {
      // const res = await (await Database.database()).query('SELECT * FROM users')
      const res = await knex.select().from('users')

      if(!res) {
        console.log("Não foi possível fazer a requisição!")
        return new Error("Não foi possível fazer a requisição!")
      }

      return await res
    } catch (error) {
      console.error(error)
    }
  }

  public async edit(user: User){
    try {
      const findUser = (await Database.database()).query(`
        SELECT * FROM users WHERE id = ${user.id}
      `)

      if(!findUser){
        console.log("Not find User.")
        return null
      }
      const hash = await bcrypt.hash(user.password, 10)
      const update = (await Database.database()).query(`
        UPDATE users 
        SET username = '${user.username}',
            password = '${hash}'
        WHERE id = ${user.id}
      `)

      if(!update){
        throw new Error('Update incorreto')
      }else{
        return update
      }
    } catch (error) {
      console.error('Deu ruim!', error)
    }
  }

  public async createuser(user: User) {
    try {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
      const res = (await Database.database()).query(`
      INSERT INTO users(username, password) VALUES('${user.username}', '${user.password}')
      `)

      if(!res){
        console.error('Não foi possível criar o usuário.')
      }
      return res
    } catch (error) {
      console.error('Erro na criação do usuário!', error)
      throw new Error("Não foi possível criar o usuario")
    }
  }
}

export default new Users()
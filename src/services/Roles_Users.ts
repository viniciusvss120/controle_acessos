import Database from '../database/dbconfig'

type Roles_Permissions = {
  user_id: number,
  roles_id: number
}
class Roles_Users{
  public async list(){
    try {
      const result = await (await Database.database()).query(`SELECT * FROM users_roles`)
      console.log(result[0])
      return result[0]
    } catch (error) {
      console.error(error)
    }
  }
  public async create(data: Roles_Permissions){
    try {
      const insert = (await Database.database()).query(`
      INSERT INTO users_roles(user_id, roles_id)
      VALUE(${data.user_id}, ${data.roles_id})
    `)
      return insert
    } catch (error) {
      console.error(error)
      return new Error('Deu ruim')
    }
  }
}

export default new Roles_Users()
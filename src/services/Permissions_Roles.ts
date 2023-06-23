import Database from '../database/dbconfig'

type Roles_Permissions = {
  role_id: number,
  permissions_id: number[]
}
class Permissions_Roles{
  public async list(){
    try {
      const result = await (await Database.database()).query(`SELECT * FROM permissions_roles`)
      console.log(result[0])
      return result[0]
    } catch (error) {
      console.error(error)
    }
  }

  public async create(data: Roles_Permissions){
    try {
      let result
      for(let i = 0; i < data.permissions_id.length; i++){
       const insert = (await Database.database()).query(`
          INSERT INTO permissions_roles(roles_id, permissions_id)
          VALUE(${data.role_id}, ${data.permissions_id[i]})
        `)
        result = insert
      }
      return result
    } catch (error) {
      console.error(error)
      return new Error('Deu ruim')
    }
  }
}

export default new Permissions_Roles()
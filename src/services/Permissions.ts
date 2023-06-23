import Database from '../database/dbconfig'

type PermissionType= {
  id: number,
  name: string,
  description: string
}
class Permissions{
  public async list(){
    try {
      const resul = await (await Database.database()).query('SELECT * FROM permissions')

      if(!resul){
        console.error("Problemas com a listagem de roles")
      }

      // const newArray = await resul.map((item: any, index) => item[index])
      // const data = {
      //   ids: newArray.length,
      //   dados: newArray
      // }
      return await resul[0]
    } catch (error) {
      console.error("Deu ruim", error)
    }
  }

  public async create(permission: PermissionType){
    try {
      console.log(permission)
      const result = (await Database.database()).query(`
        INSERT INTO permissions(id, name, descriptions) 
        VALUE(${permission.id}, '${permission.name}', '${permission.description}')
      `)

      if(!result){
        console.error("Deu ruim")
        return null
      }

      return result
    } catch (error) {
      console.error("Falha ao criar role!", error)
      return error
    }
  }

  public async permissionEdit(permission: PermissionType){
    try {
      // const permissionId = Math.floor(Date.now() * Math.random())
      // console.log(permissionId)
      const result = (await Database.database()).query(`
        UPDATE permissions
        SET name = '${permission.name}',
            description = '${permission.description}'
        WHARE id = ${permission.id}
      `)

      return result
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Permissions()
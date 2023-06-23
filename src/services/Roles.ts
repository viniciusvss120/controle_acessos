import Database from '../database/dbconfig'

type RolesType= {
  id: number,
  name: string,
  description: string
}
class Roles {
  public async list(){
    try {
      const resul = await (await Database.database()).query('SELECT * FROM roles')

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

  public async create(role: RolesType){
    try {
      console.log(role)
      const result = (await Database.database()).query(`
        INSERT INTO roles(id, name, description) 
        VALUE(${role.id}, '${role.name}', '${role.description}')
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

  public async roleEdit(role: RolesType){
    try {
      // const roleId = Math.floor(Date.now() * Math.random())
      // console.log(roleId)
      const result = (await Database.database()).query(`
        UPDATE roles
        SET name = '${role.name}',
            description = '${role.description}'
        WHARE id = ${role.id}
      `)

      return result
    } catch (error) {
      console.error(error)
    }
  }

  // public async edit(role: RolesType){
  //   try {
    
  //     const roleId = Math.floor(Date.now() * Math.random())
  //     const update = (await Database.database()).query(`
  //       UPDATE roles 
  //       SET name = '${role.name}',
  //           description = '${role.description}',
  //           id = ${Number(roleId)}
  //       WHERE id = ${role.id}
  //     `)

  //     if(!update){
  //       throw new Error('Update incorreto')
  //     }
  //     return update
  //   } catch (error) {
  //     console.error('Deu ruim', error)
  //   }
  // }
}

export default new Roles()
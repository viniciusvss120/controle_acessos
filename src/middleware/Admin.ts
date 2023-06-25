import { Request, Response,NextFunction } from 'express'
import {verify,VerifyOptions } from 'jsonwebtoken'
import knex from '../database/knex'


const secret = "nsnjdkkkfgDFVkk30V"

// declare module 'jsonwebtoken' {
//   export interface UserIDJwtPayload extends jwt.JwtPayload {
//       userId: number
//   }
// }

type TokenPayload = {
  id: number;
  iat: number;
  exp: number;
}
class Admin{

  public async decoded(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers['authorization']

    if(authToken !== undefined){
      const bearer = authToken.split(' ')
      const token = bearer[1]
      const userId = verify(token, secret)

      const {id} = userId as TokenPayload

      if(!userId){
        res.status(401)
        res.json({error: "Token invalido"})
        }else{
          const user = await knex.select('roles_id').from('users_roles').where({user_id: id})
            let userId = user.pop()
            const result = await knex.select().from('permissions_roles').where({roles_id: userId.roles_id})
            
            const permissions = result.map(item => item.permissions_id)
            const idUser = result.find(item => item.roles_id === userId.roles_id).roles_id
            
            var params = {
              user: idUser,
              permissions
            }
            const validate = params.permissions.includes(1)
            if(!validate) {
              res.status(401)
              res.json({error: "Usuário sem permissão para listar users."})
            }else{
              next()
            }
        }
    }else{
      res.status(404)
      console.error("Token não enviado!")
    }
  }
  public async editPermissionsUser(req: Request, res: Response, next: NextFunction){
    
    const authToken = req.headers['authorization']

    if(authToken !== undefined){
      const bearer = authToken.split(' ')
      const token = bearer[1]
      const userId = verify(token, secret)

      const {id} = userId as TokenPayload

      if(!userId){
        res.status(401)
        res.json({error: "Token invalido"})
        }else{
          const user = await knex.select('roles_id').from('users_roles').where({user_id: id})
            let userId = user.pop()
            const result = await knex.select().from('permissions_roles').where({roles_id: userId.roles_id})
            
            const permissions = result.map(item => item.permissions_id)
            const idUser = result.find(item => item.roles_id === userId.roles_id).roles_id
            
            var params = {
              user: idUser,
              permissions
            }
            const validate = params.permissions.includes(2)
            if(!validate) {
              res.status(401)
              res.json({error: "Usuário sem permissão para editar users."})
            }else{
              next()
            }
      }
    }
  } 
  public async createPermissionsUser(req: Request, res: Response, next: NextFunction){
    
    const authToken = req.headers['authorization']

    if(authToken !== undefined){
      const bearer = authToken.split(' ')
      const token = bearer[1]
      const userId = verify(token, secret)

      const {id} = userId as TokenPayload

      if(!userId){
        res.status(401)
        res.json({error: "Token invalido"})
        }else{
          const user = await knex.select('roles_id').from('users_roles').where({user_id: id})
            let userId = user.pop()
            const result = await knex.select().from('permissions_roles').where({roles_id: userId.roles_id})
            
            const permissions = result.map(item => item.permissions_id)
            const idUser = result.find(item => item.roles_id === userId.roles_id).roles_id
            
            var params = {
              user: idUser,
              permissions
            }
            const validate = params.permissions.includes(3)
            if(!validate) {
              res.status(401)
              res.json({error: "Usuário sem permissão para criar um novo user."})
            }else{
              next()
            }
      }
    }
  } 
}
export default new Admin()
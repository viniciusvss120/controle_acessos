import { Request, Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Database from '../database/dbconfig'

const secret = "nsnjdkkkfgDFVkk30V"

class Admin{

  public decoded(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers['authorization']

    if(authToken !== undefined){
      const bearer = authToken.split(' ')
      const token = bearer[1]
      jwt.verify(token, secret, async(error, data) => {
        if(error){
          res.status(400)
          res.json({err: "Token Invalido!"})
        }else{
          if(data !== undefined){
        

            const result = await(await Database.database()).query(`
            SELECT * FROM permissions_roles
            WHERE roles_id = (SELECT roles_id FROM users_roles
            WHERE user_id = ${2} )
            `)
            result.pop()
            let userId = {
             id: data,
             permissions: result 
            }

            userId.permissions.map(item => item.constructor)
            
          
            let permissions = result[0]
            console.log(permissions)
          }
          next()
        }
      })
    }else{
      res.status(404)
      console.error("Token não enviado!")
    }
  }

}

export default new Admin()
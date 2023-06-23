import { Request, Response } from 'express'
import Roles_Users from "../services/Roles_Users";

class Users_Roles{
  public async listUsersRole(req: Request, res: Response){
    try {
      const list = await Roles_Users.list()

      if(list){
        res.status(200)
        res.json(list)
      }else{
        console.error("Deu ruim!")
      }
    } catch (error) {
      res.status(401)
      res.json(error)
    }
  }
  public async addRoles(req: Request, res: Response): Promise<void>{
    try {

      const result = await Roles_Users.create(req.body)
      if(result){
        res.status(200)
        res.json(result)
      }

    } catch (error) {
      console.log(error)
    }
  }
}

export default new Users_Roles()
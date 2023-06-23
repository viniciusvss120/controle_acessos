import { Request, Response } from 'express'
import Permissions from "../services/Permissions";
import Roles from "../services/Roles";
import Permissions_Roles from "../services/Permissions_Roles";

class Roles_Permissions{
  public async listPermissionsRole(req: Request, res: Response){
    try {
      const list = await Permissions_Roles.list()

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

  public async addPermissions(req: Request, res: Response): Promise<void>{
    try {

      const result = await Permissions_Roles.create(req.body)
      if(result){
        res.status(200)
        res.json(result)
      }

    } catch (error) {
      console.log(error)
    }
  }
}

export default new Roles_Permissions()
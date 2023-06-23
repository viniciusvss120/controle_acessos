import { Request, Response } from 'express'
import Permissions from "../services/Permissions";

class PermissionController{
  public async listePermissions(req: Request, res: Response): Promise<Response>{
    try {
      const list = await Permissions.list()
      if(list){
        res.status(200)
        return res.json(list)
      }
    } catch (error) {
      res.status(401)
      console.log(error)
    }
    return res
  }
  public async createPermissions(req: Request, res: Response): Promise<Response>{
    try {
      // const id = Math.floor(Date.now() * Math.random())
      const create = await Permissions.create(req.body)

      if(create){
        res.status(200)
        res.json(create)
      }
    } catch (error) {
      res.status(401)
      res.json(error)
    }
    return res
  }

  public async editPermissions(req:Request, res:Response): Promise<Response>{
    try {
      const update = await Permissions.permissionEdit(req.body)

      if(update){
        res.status(200)
        res.json(update)
      }
      
    } catch (error) {
      res.status(401)
      console.error(error)
    }
    return res
  }
}

export default new PermissionController()
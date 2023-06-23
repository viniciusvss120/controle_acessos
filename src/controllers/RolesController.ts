import { Request, Response } from 'express'
import Roles from "../services/Roles";

class RolesController{
  public async listeRoles(req: Request, res: Response): Promise<any>{
    try {
      const list = await Roles.list()
      if(list){
        res.status(200)
        return res.json(list)
      }
    } catch (error) {
      res.status(401)
      console.log(error)
    }
  }
  public async createRole(req: Request, res: Response){
    try {
      const id = Math.floor(Date.now() * Math.random())
      const create = await Roles.create({id,...req.body})

      if(create){
        res.status(200)
        res.json(create)
      }
    } catch (error) {
      res.status(401)
      res.json(error)
    }
  }

  public async editRole(req:Request, res:Response){
    try {
      const update = await Roles.roleEdit(req.body)

      if(update){
        res.status(200)
        res.json(update)
      }
      
    } catch (error) {
      res.status(401)
      console.error(error)
    }
  }
}

export default new RolesController()
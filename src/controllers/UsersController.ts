import { Request, Response } from 'express'
import Users from "../services/Users"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const secret = "nsnjdkkkfgDFVkk30V"

class UserController{

  public async login(req: Request, res: Response): Promise<Response>{
    try {
      const {username, password} = req.body
      const user = await Users.login(username)

      if(user){
        const comparePassword = await bcrypt.compare(password, user[0].password)
        if(comparePassword){

          const token = jwt.sign({id: user[0].id , username: user[0].username, password: user[0].password}, secret)
          res.json({token})

          jwt.verify(token, secret, (error, data) => {
            if(error){
              res.status(400)
              res.json({err: "Token Invalido!"})
            }else{
              let userId = {}

              Object.assign(userId, data)
              console.log(userId)
            }

          })
        }else{
          res.status(401)
          res.send("Senha incorreta!!")
        }
      }
    } catch (error) {
      res.status(400)
      new Error("Username ou password incorreto")
    }
    return res
  }

  public async listeUser(req: Request, res: Response): Promise<Response>{
    try {
      const list = await Users.listUser()

      if(list){
        res.status(200)
        res.json(list)
      }
    } catch (error) {
      res.status(401)
      console.log(error)
    }
    return res
  }

  public async creteUser(req: Request, res: Response): Promise<Response>{
    try {
      // Pensar em uma lógica para incrementar o id com base na quantia de users no databas
    

      const user = await Users.createuser(req.body)

      if(user) {
        res.status(200)
        return res.json(user)
      } 
    } catch (error) {
      res.status(401)
      console.error('Deu ruim',error)
    }
    return res
  }

  public async editUser(req: Request, res: Response): Promise<Response>{
    try {
      const update = await Users.edit(req.body)

      if(update){
        res.status(200)
        return await res.json(update)
      }
      
    } catch (error) {
      res.status(401)
      console.error('Deu ruim',error)
    }
    return res
  }
}

export default new UserController()
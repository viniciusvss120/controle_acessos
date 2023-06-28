import { Request, Response } from 'express'
import Produtos from '../services/Produtos'
class ProdutoController{
  public async listarProdutos(req: Request, res: Response): Promise<Response>{
    try {
      const produtos = await Produtos.listar()

      if(produtos){
        res.status(200)
        res.json(produtos)
      }else{
        res.json("Produtos inesitente.")
      }
    } catch (error) {
      res.status(404)
      res.json({err: error})
    }
    return res
  }

  public async createProdutos(req: Request, res: Response): Promise<Response>{
    try {
      const create = await Produtos.create(req.body)

      res.status(200)
      res.json(create)
    } catch (error) {
      res.status(401)
      console.error(error)
    }
    return res
  }

  public async editProdutos(req: Request, res: Response): Promise<Response>{
    try {
      const edit = await Produtos.edit(req.body)

      res.status(200)
      res.json(edit)
    } catch (error){
      res.status(400)
      res.json({err: error})
    }
    return res
  }

  public async deleteProdutos(req: Request, res: Response): Promise<Response>{
    try {
      const deleteProd = await Produtos.delete(req.body)

      if(deleteProd){
        res.status(200)
        res.json(deleteProd)
      }
    } catch (error) {
      res.status(400)
      res.json({err: error})
    }
    return res
  }
}

export default new ProdutoController()
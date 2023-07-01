import Database from '../database/dbconfig'


type typeProdutos = {
  id?: number,
  name?: string,
  quantidade?: number
}

// type objProduto= {
//   id?: number,
//   name?: string,
//   quantidade?: number
// }
class Produtos {
  public async listar(produto: typeProdutos){
    try {
      // const objKey = Object.keys(produto)

      // const newObj = objKey.filter(item => produto[item] !== null)
      // // console.log(newObj)

      // // Object.assign(objProd, newObj)

      // // for(let item in objProd){
      // //   Object.assign(objProd, produto[item])
      // // }
      // newObj.forEach((item, index) => {
      //   let objProd: typeProdutos = {

      //   }
      // })
      
      const result = await (await Database.database()).query(`SELECT * FROM produtos`)

      return result[0]
    } catch (error) {
      console.error('Deu ruim', error)
    }
  }

  public async listByname(produto: typeProdutos){
    try {
      const result = await (await Database.database()).query(`
        SELECT * FROM produtos
        WHERE name = '${produto.name}'
      `)
      return result[0]
    } catch (error) {
      console.error('Deu ruim', error)
    }
  }
  public async listByquantidade(produto: typeProdutos){
    try {
      const result = await (await Database.database()).query(`
        SELECT * FROM produtos
        WHERE quantidade = '${produto.quantidade}'
      `)
      return result[0]
    } catch (error) {
      console.error('Deu ruim', error)
    }
  }

  public async create(produtos: typeProdutos){
    try {
      const result = (await Database.database()).query(`
      INSERT INTO produtos(name, quantidade) VALUES('${produtos.name}', ${produtos.quantidade})
      `)
      return result
    } catch (error) {
      console.error('Deu ruim',error)
    }
  }

  public async edit(produto: typeProdutos){
    try {
      const result = (await Database.database()).query(`
        UPDATE produtos
        SET name = '${produto.name}',
            quantidade = ${produto.quantidade}
        WHERE id = ${produto.id}
      `)

      return result
    } catch (error) {
      console.error('Deu ruim', error)
    }
  }

  public async delete(produto: typeProdutos){
    try {
      const result = (await Database.database()).query(`
        DELETE FROM produtos WHERE id = ${produto.id}
      `)
      return result
    } catch (error) {
      console.error('Deu ruim',error)
    }
  }
}

export default new Produtos()
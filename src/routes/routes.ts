import { Router } from 'express'
import Admin from '../middleware/Admin'
import UsersController from '../controllers/UsersController'
import RolesController from '../controllers/RolesController'
import PermissionController from '../controllers/PermissionController'
import Roles_Permissions from '../acessos/Roles_Permissions'
import Users_Roles from '../acessos/Users_Roles'
import ProdutosController from '../controllers/ProdutosController'

const routes = Router()

//Users
routes.post('/login', UsersController.login)
routes.get('/',Admin.list, UsersController.listeUser)
routes.post('/create',Admin.createProdutos, UsersController.creteUser)
routes.put('/edituser',Admin.editProdutos, UsersController.editUser)
// routes.post('/store', UserController.create)

//Roles
routes.get('/roles',Admin.list, RolesController.listeRoles)
routes.post('/createRole',Admin.createProdutos, RolesController.createRole)
routes.put('/editrole',Admin.editProdutos, RolesController.editRole)

//Permissions
routes.get('/permissions', PermissionController.listePermissions)
routes.post('/createpermission', PermissionController.createPermissions)
routes.put('/editpermissions', PermissionController.editPermissions)

//Permissions_Roles
routes.post('/createpermission_role', Roles_Permissions.addPermissions)
routes.get('/permission_role', Roles_Permissions.listPermissionsRole)

//Users_Roles
routes.get('/users_role', Users_Roles.listUsersRole)
routes.post('/createusers_role', Users_Roles.addRoles)

//Produtos
routes.get('/produtos', Admin.list, ProdutosController.listarProdutos)
routes.get('/produtosbyname', Admin.list, ProdutosController.listByName)
routes.post('/produtos',Admin.createProdutos, ProdutosController.createProdutos)
routes.put('/produtos', Admin.editProdutos, ProdutosController.editProdutos)
routes.delete('/produtos', ProdutosController.deleteProdutos)

export default routes

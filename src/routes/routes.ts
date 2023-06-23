import { Router } from 'express'
import Admin from '../middleware/Admin'
import UsersController from '../controllers/UsersController'
import RolesController from '../controllers/RolesController'
import PermissionController from '../controllers/PermissionController'
import Roles_Permissions from '../acessos/Roles_Permissions'
import Users_Roles from '../acessos/Users_Roles'
const routes = Router()

//Users
routes.post('/login', UsersController.login)
routes.get('/',Admin.decoded, UsersController.listeUser)
routes.post('/create', UsersController.creteUser)
routes.put('/edituser',Admin.decoded, UsersController.editUser)
// routes.post('/store', UserController.create)

//Roles
routes.get('/roles', RolesController.listeRoles)
routes.post('/createRole', RolesController.createRole)
routes.put('/editrole', RolesController.editRole)

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

export default routes

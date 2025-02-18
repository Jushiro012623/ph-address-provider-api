import CrudService from "@src/services/crudService";

const { User } = require("../../models")
const user = new CrudService(User, 'User')

export { user as User }

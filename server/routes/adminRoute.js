const admin_route = require('express').Router()
const adminController = require('../controller/adminController')


admin_route.get('/students', adminController.getStudents)
admin_route.get('/chefs', adminController.getChefs)

admin_route.put('/updateUserStatus', adminController.updateAccessStatus)
admin_route.patch('/updateChefStatus', adminController.updateChefStatus)

module.exports = admin_route
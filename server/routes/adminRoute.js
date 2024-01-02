const admin_route = require('express').Router()
const adminController = require('../controller/adminController')


admin_route.get('/students', adminController.getStudents)

admin_route.put('/updateUserStatus', adminController.updateAccessStatus)

module.exports = admin_route
const chef_route = require('express').Router();
const chefController = require('../controller/chefController');

chef_route.get('/profile/:id', chefController.getStudent)
chef_route.post('/add-course', chefController.addCourse)
chef_route.get('/myCourse/:id', chefController.getCourse)


module.exports = chef_route;
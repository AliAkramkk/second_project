const chef_route = require('express').Router();
const chefController = require('../controller/chefController');

chef_route.get('/profile/:id', chefController.getStudent)
chef_route.post('/add-course', chefController.addCourse)
chef_route.get('/myCourse', chefController.getCourse)
chef_route.get('/getcourse/:course_id', chefController.getVideoCourse)
chef_route.put('/changeCourse', chefController.handleChangeCourse)
chef_route.delete('/deleteCourse/:id', chefController.deleteCourse)
chef_route.put('/delete-chapter', chefController.deleteChapter)


module.exports = chef_route;
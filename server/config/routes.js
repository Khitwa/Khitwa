var helpers = require('./helpers.js');
var userController = require('../users/userController.js');

module.exports = function(app, express){
	
	// User routes goes here
	app.post('/api/users/signin', userController.signin);
	app.post('/api/users/signup', userController.signup);
	app.get('/api/users/getall', userController.getAll);
	app.get('/api/users/x/:username', userController.getUser);
	app.get('/api/users/signedin', userController.checkAuth);
};
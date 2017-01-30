var Organization = require('./organizationModel.js');
var Opportunity = require('../opportunities/opportunityModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var helpers = require('../config/helpers.js');

module.exports = {

	createOrganization : function (req, res) {

		Organization.findOne({name: req.body.name})
		.exec( function (error, found){
			if (found) {
				helpers.errorHandler('Name Already Exists', req, res);
			}else {
				 var newOrg = Organization({
				 name : req.body.name,
				 password : req.body.password,
				 causes_area : req.body.causes_area,
				 locations : req.body.locations,
				 missionStatement : req.body.missionStatement,
				 contactInfo : req.body.contactInfo,
				 rate : req.body.rate,
				 picture : req.body.picture,
				 currentOpportunities : req.body.currentOpportunities,
				 pastOpportunities : req.body.pastOpportunities
				});

				newOrg.save( function (error, saved){
					if (saved) {
						res.status(201).send('Organization Created');
					}
				});
			}
		});
	},

	signin : function (req, res) {

		var name =  req.body.name;
		var password = req.body.password;

		Organization.findOne({name : name})
		.exec(function (error, organization) {
			if (organization) {
				Organization.comparePassword(password, organization.password, res, function (found) {
					if (found) {
						var token = jwt.encode(organization,'secret');
						res.setHeader('x-access-token',token);
						res.json({ token : token, name : organization.name });
					}else{
						helpers.errorHandler(error, req, res);
					}
				})
			}else{
				helpers.errorHandler('User Does Not Exists', req, res);
			}
		})
	},

	checkAuth : function (req, res) {

		var token = req.headers['x-access-token'];
		if (!token) {
			helpers.errorHandler('No Token', req, res);
		}else{
			var organization = jwt.decode(token,'secret');
			Organization.findOne({name : organization.name})
			.exec(function (error, org) {
				if(org){
					res.status(200).send('Authorized');
				}else{
					helpers.errorHandler('Organization Not Found', req, res);
				}
			})
		}
	},

	getByName : function (req, res) {

		Organization.findOne({ name: req.params.name})
		.exec(function (error, organization) {
			if (organization) {
				res.status(200).send(organization);
			}else{
				helpers.errorHandler('Organization Not Found', req, res);
			}
		});
	},

	getAll : function (req, res) {

		Organization.find({})
		.exec( function (error, organization){
			if (organization) {
				res.status(200).send(organization);
			}
		});
	},

	editProfile :  function (req, res) {

		var token = req.headers['x-access-token'];
		if (!token) {
			helpers.errorHandler('No Token', req, res);
		} else {
			var org = jwt.decode(token,'secret');

			Organization.findOne({ name: org.name})
			.exec( function (error, organization){


		        organization.causes_area = req.body.causes_area || organization.causes_area;
		        organization.locations = req.body.locations || organization.locations;
		        organization.missionStatement = req.body.missionStatement || organization.missionStatement;
		        organization.contactInfo = req.body.contactInfo || organization.contactInfo;
		        organization.rate = req.body.rate || organization.rate;
		        organization.picture = req.body.picture || organization.picture;
		        // organization.currentOpportunities = req.body.currentOpportunities || organization.currentOpportunities;
		        // organization.pastOpportunities = req.body.pastOpportunities || organization.pastOpportunities;
		        if(req.body.oldPassword){
						Organization.comparePassword(req.body.oldPassword , organization.password , res , function(){
								organization.password = req.body.password;
								organization.save(function(savedOrg){
									res.status(201).send('Updated');
								});
						});
					}

		        organization.save(function(error,saved){
		        	if (saved) {
		        		res.status(201).send(saved);
		        	}
		        });
			});
		}
	},

	deleteOrganization : function (req, res ) {

		var token = req.headers['x-access-token'];
		if (!token) {
			helpers.errorHandler('No Token', req, res);
		} else {
			org = jwt.decode(token, 'secret');
			Organization.findOne({ name: org.name}).remove()
			.exec(function (error, organization){
				if(organization.result.n){
					res.status(201).send('Organization Deleted');
				}else{
					helpers.errorHandler(error, req, res);
				}
			});
		}
	},

	addOpportunity : function (req, res) {

		var token = req.headers['x-access-token'];
		if (!token) {
			helpers.errorHandler('No Token', req, res);
		}else{
			var organization = jwt.decode(token,'secret');
			var organizer = organization.name;
			var newOpp = new Opportunity({
				title : req.body.title,
				_organizer : organizer,
				startDate : req.body.startDate,
				endDate: req.body.endDate,
				location : req.body.location,
				causesArea : req.body.causesArea,
				description : req.body.description,
				skillsRequired : req.body.skillsRequired,
				poster : req.body.poster,
				currOpenings : req.body.currOpenings,
				closedOppenings : req.body.closedOppenings,
				status : req.body.status
			});

			newOpp.save(function (error, saved) {
				if (saved) {
					Organization.findOne({name : organizer})
					.exec(function (error, org) {
						if(org){
							var id = saved._id;
							org.currentOpportunities.push(id);
							org.save(function (error, savedArray) {
								if (savedArray) {
									console.log(org.currentOpportunities)
								}
							})
						}
					})
					res.status(201).send('Opportunity Created');
				}
			});
		}
	},

	closeOpportunity : function (req, res) {

		var token = req.headers['x-access-token'];
		if (!token) {
			helpers.errorHandler('No Token', req, res);
		} else {
			var organization = jwt.decode(token, 'secret');
			var id = req.params.id;
			Opportunity.findOne({_id : id})
			.exec(function (error, found) {
				if (found) {
					found.status='Closed';
					found.save(function (error, saved) {
						if (saved) {
							console.log('Changed to Closed');
						}
					})
				}else{
					helpers.errorHandler('Opportunity Not Found', req, res);
				}
			})
			Organization.findOne({name : organization.name})
			.exec(function (error, org) {
			 	if (org) {
					var index = org.currentOpportunities.indexOf(id.toString());
					var toClose = org.currentOpportunities.splice(index,1);
					org.pastOpportunities.push(toClose);
					org.save(function (error, savedOrg) {
						if (savedOrg) {
							res.status(201).send('Opportunity Closed');
						}
					})
				}
			})
		}
	},
	reopenOpportunity : function (req, res) {
		
		var token = req.headers['x-access-token'];
		var id = req. params.id.toString();

		if (!token) {
			helpers.errorHandler('No Token', req, res);
		} else {
			Opportunity.findOne({_id : id})
			.exec(function (error, opportunity) {
				if (opportunity) {
					opportunity.status='Active';
					var org = jwt.decode(token, 'secret');
					Organization.findOne({name : org.name})
					.exec(function (error, organization) {
						if (organization) {
							var index = organization.pastOpportunities.indexOf(id);
							organization.pastOpportunities.splice(index,1);
							organization.currentOpportunities.push(id);
							organization.save(function (error, saved) {
								if (saved) {
									console.log('Moved to open opportunity array');
								}
							})
						}
					})
					opportunity.save(function (error,saved) {
						if (saved) {
							res.status(201).send('Opportunity Reopened');
						}
					})
				} else {
					helpers.errorHandler('Opportunity Not Found', req, res);
				}
			})
		}
	}
};
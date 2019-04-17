const employee = require("../models/employee");



// Defining methods for the booksController
module.exports = {
  find: function(req, res) {
    let x = req.params.UserToken
    let y = x.split(" ")[1]
    // console.log(y)
    employee   
      .find({"UserToken":  y })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findForEmployerChange: function(req, res) {
    console.log(req.body)
    employee   
      .find( {
        // $and : [
        //   {name: req.body.name}, {dob: req.body.dob}, {gender: req.body.gender}
        // ]
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    let x = req.params.id
    let y = x.split(" ")[1]
    console.log(y)
    employee
      .findById(y)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("this is not the one" +req.body)
    employee
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log(req.body)
    console.log()
    let z = req.body 
    employee
      .findOneAndUpdate({ _id: req.params.id}, {$set: z })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    employee
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
 
};
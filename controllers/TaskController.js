const Task = require("../models/Task");


module.exports = {
    findAll: function(req, res) {
        Task
          .find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      findById: function(req, res) {
          console.log('no no no'+req.params.id)
        Task
          .find({'user_id': req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
        console.log(req.params.id)
        console.log(req.body.Content)
        newTask = new Task({
           user_id: req.params.id,
           Content: req.body.Content,
           When: req.body.When,
           Done: req.body.Done

       }).save((err, doc) => {
        if(err) {
            return res.send({
                success: false,
                message:'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message:'Valid Sign in',
           
        })
    })     
      },
      delete: function(req, res) {
          console.log('this one')
          console.log(req.params.id)
          Task
          .deleteOne(
              { _id: req.params.id},
              )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
  
};
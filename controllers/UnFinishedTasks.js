const Completed = require("../models/UnFinished");


module.exports = {
    findById: function(req, res) {
        console.log(req.params.id)
        Completed
        .find({'user_id': req.params.id})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
      create: function(req, res) {
        
        console.log("Hit this"+req.params.id)
        
        CompletedTask = new Completed({
           user_id: req.params.id,
           Content: req.body.Content,
           WhenCompleted: req.body.When

       }).save((err, doc) => {
        if(err) {
            return res.send({
                success: false,
                message:'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message:'Success',
           
        })
    })     
      }
  
};
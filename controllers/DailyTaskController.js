const Daily = require("../models/Daily");


module.exports = {
      findById: function(req, res) {
          console.log(req.params.id)
          Daily
          .find({'user_id': req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
        console.log(req.params.id)
        console.log(req.body.Content)
        Daily = new Daily({
           user_id: req.params.id,
           Content: req.body.Content,
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
      }
  
};
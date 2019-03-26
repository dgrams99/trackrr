const user = require("../models/user");
const UserSession = require("../models/userSession");

module.exports = {

    userSignin: function (req, res , next) {
        const {
            body
        } = req;

        const {
           
            password
        } = body;
        let {
            email
        } = body;

       
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email: cannot be blank'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password: name cannot be blank'
            });
        }
        email = email.toLowerCase();

            

        user.find({
            email: email
        }, (err, previousUser) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            } else if (previousUser.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account alredy exist'
                });
            }

           
            const newUser = new user();

            
            newUser.email = email;
            newUser.password = newUser.generateHash(password);;
            newUser.save((err, user) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Error: Server Error'
                    });
                }
                return res.json({
                    success: true,
                    message: 'Signed up'
                })
            })
        })

    },
    userSignIN: function (req, res) {
        const {
            body
        } = req;

        const {
            password
        } = body;
        let {
            ID,
            email
        } = body;


        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email: cannot be blank'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password: name cannot be blank'
            });
        }

        email = email.toLowerCase();

        user.find({
           
            email: email
        }, (err, users) => {
            if(err) {
                return res.send({
                    success: false,
                    message:'Error: Server error'
                });
            }
            if(users.length !=1) {
                return res.send({
                    success:false,
                    message: 'Error Invalid'
                });
            }
            const user =users[0];
            if(!user.validPassword(password)) {
                return res.send({
                    success:false,
                    message: 'Error Wrong Email or Password'
                });
            }
            const userSession = new UserSession();
          
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if(err) {
                    return res.send({
                        success: false,
                        message:'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message:'Valid Sign in',
                    token: doc._id,
                    Usertoken:user._id
                })
            })
        })
    },
   


    verify: function (req, res) {
        //get token 
        const {query} = req;
        const {token} = query;
      
      
        //verify token is one of the kind
       
        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error Server error'
                });
            }
            if(sessions.length !=1){
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }else {
                return res.send({
                    success: true,
                    message: 'Good here'
                    
                })
            }
        })
    },
    logout: function (req, res) {
        console.log('hit')
        const {query} = req;
        const {token} = query;
        //verify token is one of the kind
            
        UserSession.findByIdAndDelete({
             "_id" : token
        }, null ,(err, sessions) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error Server error'
                });
            } 
                return res.send({
                    success: true,
                    message: 'Good that worked'
                })
            
        })
    }
}
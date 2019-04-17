const user = require("../models/user");
const UserSession = require("../models/userSession");

// const voice = require("./callController");
// const accountSid = 'ACe6c2d33e529cf6715b7715f2d8096e64';
// const authToken = 'f958ca65e79228d835bb5a38f6301bbb';
// const client = require('twilio')(accountSid, authToken);


module.exports = {


    userSignin: function (req, res , next) {
        const {
            body
        } = req;

        const {
            companyName,
            password
        } = body;
        let {
            email
        } = body;

        if (!companyName) {
            return res.send({
                success: false,
                message: 'Error: Company name: cannot be blank'
            });
        }
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

            newUser.companyName = companyName;
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
                    message: 'Good'
                    
                })
            }
        })
    },
    logout: function (req, res) {
        const {query} = req;
        const {token} = query;
        //verify token is one of the kind

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set:{isDeleted:true}
        }, null ,(err, sessions) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error Server error'
                });
            } 
                return res.send({
                    success: true,
                    message: 'Good'
                })
            
        })

    }
}
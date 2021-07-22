const User = require("../models/user");

module.exports.signUp = async (req , res) => {
    try{
        const { email , username , password } = req.body;
        let user = await User.findOne({ email });
        if( user ){
            res.status(422).json({
                message : "Email already in use"
            })
            return;
        }else{
            user = await User.findOne({  username });
            if( user ){
                res.status(422).json({
                    message : "Username already in use"
                })
                return;
            }else{
                const user = User.create({
                    email , password , username
                });
                res.status(200).json({
                    message : 'You were successfully signed up'
                })
                return;
            }
        }
    }catch(error){
        res.status(500).json({
            message : 'Something Went Wrong!'
        });
        return;
    }
}



module.exports.signIn = async (req , res) => {
    try{
        const { username , password } = req.body;
        const isEmail = username.includes('@');
        if( isEmail ){
            const user = await User.findOne({ email : username });
            if( user && user.password === password ){
                res.status(200).json({
                    user : {...user.toJSON() , password : null}
                })
            }else{
                res.status(401).json({
                   message : 'Invalid Credentials'
                })
            }
            return;
        }else{
            const user = await User.findOne({ username });
            if( user && user.password === password ){
                res.status(200).json({
                    user : {...user.toJSON() , password : null}
                })
            }else{
                res.status(401).json({
                    message : 'Invalid Credentials'
                })
            }
            return;
        }
    }catch(error){
        res.status(500).json({
            message : 'Something Went Wrong!'
        });
        return;
    }
}


module.exports.googleSignIn = async (req , res) => {
    try{
        const { username , email , image } = req.body;
        let user = await User.findOne({ email : email });
        if( user ){
            return res.status(200).json({
                message : 'Google SignIn'
            })
        }else{
            user = await User.create({
                username ,
                email
            })
            return res.status(200).json({
                message : 'Google SignIn'
            })
        }
    }catch(error){
        res.status(500).json({
            message : 'Something Went Wrong!'
        });
        return;
    }
}
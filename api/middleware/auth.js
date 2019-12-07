const jwt = require('jsonwebtoken')
const Profile = require('../model/userModel')

const auth = async (req , res , next) => {
    try{
        const token = req.header("Authorization").replace('Bearer ' , '')
        const decoded_token = jwt.verify(token , process.env.JWT_SECRET )
        const profile = await Profile.findOne({ _id : decoded_token._id , 'tokens.token': token})

        if(!profile){
           throw new Error()
        }

        req.token = token 
        req.profile = profile

        next()


    }catch(e){
       res.status(401).send({ error : 'please login first' })
    }
}

module.exports = auth
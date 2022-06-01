const express = require('express')
const route = express.Router()
const User = require("../model/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const req = require('express/lib/request');
const requireLogin = require('../middleware/requireLogin')


route.post("/signup",(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(422).json({ Error: "plasese fill the  fileds" })
    }

    User.findOne({email:email})
    .then(saveuser => {
        if(saveuser)
        {
            return res.status(422).json({ error: "User Email already exist. please  try with another Email" })
        }

    // .then((sevedUser)=>{
    //     if(savedUser){
    //         return res.status(422).json({ error: "User Email already exist. please  try with another Email" })
    //     }

        else{
            bcrypt.hash(password,12)
            .then(passwordHashing =>{
                const user = new User({
                    email,
                    name,
                    password:passwordHashing,
                })
                user.save()
                .then(user=>{
                    res.json({ sucess : true ,  user : user ,  message: "User Registration Succcessful !! " })
                })
            })
        }
    })
})

route.post('/signin', (req, res) => {

    const { email, password } = req.body
    if (!email || !password)
    {
        res.status(422).json({ error: "please fill all required fields" })
    }
    else
    {

        User.findOne({ email: email })
            .then(savedUser => {
                if (!savedUser)
                {
                    res.status(422).json({ error: "invalid email or password" })
                }

                else
                {

                    bcrypt.compare(password, savedUser.password)
                        .then(doMatch => {
                            console.log(doMatch,password,"password decoded");
                            if (doMatch)
                            {

                                const token = jwt.sign({ _id: savedUser._id, }, "abkpodkfdpokfpsoz13km0900")
                                const { _id, name, email } = savedUser
                                res.send({ token: token, user: { _id, name, email,password },message: "User signin Succcessful !! " });
                            }
                            else
                            {
                                res.status(422).json({ error: "invalid email or password" })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })


    }


})

route.get('/Alisha',requireLogin, (req, res) => {
    res.send('welcome to goa singham')
})


module.exports = route
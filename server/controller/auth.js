const User = require('../models/user');
const asyncWrapper = require('../middleware/async');
const jwt = require('jsonwebtoken');

const createUser = asyncWrapper(async (req, res) => {
    console.log(req.body);
    const existUser = await User.findOne({ email: req.body.email });
    if(existUser){
        res.status(404).json({ error: "user already exists" });
    }
    else{
        const user = await User.create(req.body);
        if(user){
            const accessToken = jwt.sign({ email: user.email, password: user.password, }, process.env.ACCESS_TOKEN_STRING);
            res.status(201).json({ accessToken });
        }
        else{
            res.status(404).json({ error: "invalid user credentials" });
        }
    }
    
})

const authenticateUser = asyncWrapper(async (req, res) => {
    console.log(req.body);
    if(Object.keys(req.body).length != 0){
        const user = await User.findOne({ email: req.body.email });
        if(user){
            const accessToken = jwt.sign({ email: user.email, password: user.password, }, process.env.ACCESS_TOKEN_STRING);
            res.status(201).json({ accessToken });
        }
        else{
            res.status(404).json({ error: "user not found" });
        }
    }
    else{
        res.status(404).json({ error: "invalid user credentials" });
    }
})

const getDoc = asyncWrapper(async (req, res) => {
    res.send("You are getting doc text info");
})


module.exports = {
    createUser,
    authenticateUser,
    getDoc,
}
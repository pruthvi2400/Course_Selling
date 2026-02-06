const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel, purchaseModel } = require("../database");
const { JWT_USER_SCERAT } = require("../config");
const { userMiddleware } = require("../middleware/user");



    userRouter.post("/signup", async function(req, res) {

    const { email, password } = req.body;

    try {

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            email,
            password: hashedPassword
        });

        res.json({
            message: "Signup successful"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
});


    userRouter.post("/login", async function(req, res){

        const email=req.body.email;
        const password=req.body.password;
        
        const user=await UserModel.findOne({
                email:email,
        })

        if(!user){

            res.status(403).json({
                message:"User nor found"
            })
            return;
        }

        const passwordMatch=await bcrypt.compare(password,user.password)

        if(user &&  passwordMatch){
            const token = jwt.sign({
                id:user._id.toString()
            }, JWT_USER_SCERAT);
            res.json({
                token,
                role: "USER",   
                email: user.email
            });
        } else {
            res.status(403).json({
                message:"Incorrect candidate"
            });
        }
    });

    userRouter.get("/purchased-courses", userMiddleware, async function(req, res){

        const userId = req.userId;
        const purchaes = await purchaseModel.find({
            userId,
           
        })
        res.json({
           purchaes
        })
    });



module.exports={
    userRouter:userRouter
};

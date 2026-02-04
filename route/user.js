const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel, purchesModel } = require("../database");
const { JWT_USER_SCERAT } = require("../config");
const { userMiddleware } = require("../middleware/user");



    userRouter.post("/signup", async function(req, res){

        const requiredBody=z.object({
            email: z.string().min(5).max(20).email(),
            password: z.string().min(6).max(50),
            firstName: z.string().min(1).max(30),
            lastName: z.string().min(1).max(30)
        })

        const parseddatawithsuccess = requiredBody.safeParse(req.body);

        if (!parseddatawithsuccess.success){
            return res.json({
                message:"The input is Invalid",
                error:parseddatawithsuccess.error
            });
        }

        const email=req.body.email;
        const password=req.body.password;
        const firstName=req.body.firstName;
        const lastName=req.body.lastName;

        const hasedPassword = await bcrypt.hash(password, 10);
        console.log(hasedPassword);

        await UserModel.create({
            email:email,
            password:hasedPassword,
            firstName:firstName,
            lastName:lastName

        })

        res.json({
            message:"you are logged in"
        });
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
                token
            });
        } else {
            res.status(403).json({
                message:"Incorrect candidate"
            });
        }
    });

    userRouter.get("/purchses", userMiddleware, async function(req, res){

        const userId = req.userId;
        const purchaes = await purchesModel.find({
            userId,
           
        })
        res.json({
           purchaes
        })
    });



module.exports={
    userRouter:userRouter
};

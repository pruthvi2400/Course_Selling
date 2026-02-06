const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminModel } = require("../database");
const {courseModel} = require("../database");
const { adminMiddleware } = require("../middleware/admin");
const { JWT_ADMIN_SCERAT } = require("../config");


adminRouter.post("/signup", async function(req, res){
     
    const requiredBody = z.object({
    email: z.string().email(),
    password: z.string().min(6)
    });


        const parseddatawithsuccess = requiredBody.safeParse(req.body);

    if (!parseddatawithsuccess.success){
        return res.json({
            message:"The input is Invalid",
            error:parseddatawithsuccess.error
        });
    }

        const email=req.body.email;
        const password=req.body.password;
        

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        await adminModel.create({
            email:email,
            password:hashedPassword,
    

        })

    res.json({
        message:"you are logged in"
    });
});

adminRouter.post("/signin", async function(req, res){
            
            const email=req.body.email;
            const password=req.body.password;
            
            const user=await adminModel.findOne({
                    email:email,
            })
    
            if(!user){
    
        res.status(403).json({
            message:"User nor found"
        });
        return;
            }
    
            const passwordMatch=await bcrypt.compare(password,user.password)
    
    if(user &&  passwordMatch){
        const token = jwt.sign({
            id:user._id.toString()
        }, JWT_ADMIN_SCERAT);
        res.json({
            token
        });
    } else {
        res.status(403).json({
            messange:"Incorrect candidate"
        });
    }
});
    

adminRouter.post("/course", adminMiddleware, async function(req, res){

    const adminId = req.userId;

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageURL = req.body.imageURL;
    const creatorID = req.body.creatorID;

    const course = await courseModel.create({
        title:title,
        description:description,
        price:price,
        imageURL:imageURL,
        creatorID:adminId
    });

    res.json({
        message:"course created",
        courseId:course._id
    });
});
       

adminRouter.put("/course", adminMiddleware, async function(req, res){
    
    const adminId = req.userId;

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageURL = req.body.imageURL;
    const courseId = req.body.courseId;

    const course = await courseModel.updateOne({
            _id:courseId,
            creatorID:adminId  // checking is this course belong to the same creator
        },{
        title:title,
        description:description,
        price:price,
        imageURL:imageURL,
    
    });

    res.json({
        message:"course updated",
        courseId:course._id
    })

});

adminRouter.put("/course/bulk", adminMiddleware, async function(req, res){
    
    const adminId = req.userId;

    const course = await courseModel.findOne({
        creatorID:adminId
    });

    res.json({
        message:"course updated",
        course
    });
});

module.exports={
    adminRouter:adminRouter
};

const { Router } = require("express");
const courseRouter = Router();
const { courseModel, purchesModel } = require("../database");
const { userMiddleware } = require("../middleware/user");

    courseRouter.get("/", async function(req, res){
    const course = await courseModel.find({});

    res.json({
    courses: course
        });

    });


 
    courseRouter.post("/purchses", userMiddleware, async function(req, res){
        const userId = req.userId;
        const courseId = req.body.courseId;

        await purchesModel.create({
            userId,
            courseId
        });

        res.json({
            message:"you are successfuly bought a course"
        });
    });

    courseRouter.post("/preview", userMiddleware, async function(req, res){
        
        const course = await courseModel.find({})

        res.json({
            course
        });
    });



module.exports={
    courseRouter:courseRouter
};

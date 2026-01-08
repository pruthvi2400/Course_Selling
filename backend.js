const express = require("express");
const app=express();
const mongoose=require("mongoose")
const bcrypt=require("bcrypt");
const { z }=require("zod");

app.use(express.json());

const { userRouter } = require("./route/user");
const { courseRouter } = require("./route/course");
const { adminRouter } = require("./route/admin");


app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

async function main(){
    await mongoose.connect("mongodb+srv://Pruthvi:H7wW3T85KoZvTIwP@cluster0.avlsfod.mongodb.net/Pruthvis-course1");
    app.listen(4000);
    console.log("listen on port 4000")
}

main()
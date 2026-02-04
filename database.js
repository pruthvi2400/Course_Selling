const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({

        email:{type: String,unique: true},
        password:String,
        firstName:String,
        lastName:String

});

const admin = new Schema({

        email:{type: String,unique: true},
        password:String,
        firstName:String,
        lastName:String

       
});

const course = new Schema({

        
        title:String,
        description:String,
        price:Number,
        imageURL:String,
        creatorID:ObjectId,
});

const purches = new Schema({

        courseId:ObjectId,
        userId:ObjectId,

});

const UserModel = mongoose.model("user", user);
const adminModel = mongoose.model("admin", admin);
const courseModel = mongoose.model("course", course);
const purchesModel = mongoose.model("purchaes", purches);

module.exports={
    UserModel:UserModel,
    adminModel:adminModel,
    courseModel:courseModel,
     purchesModel:purchesModel

};

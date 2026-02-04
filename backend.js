const express = require("express");
const mongoose = require("mongoose");
const { MONGODB_URL } = require("./config");

const app = express();

app.use(express.json());

const { userRouter } = require("./route/user");
const { courseRouter } = require("./route/course");
const { adminRouter } = require("./route/admin");


app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main(){
    if (!MONGODB_URL) {
        throw new Error("MONGODB_URL is not set. Define it in your environment.");
    }

    await mongoose.connect(MONGODB_URL);
    app.listen(4000);
    console.log("listen on port 4000");
}

main().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});

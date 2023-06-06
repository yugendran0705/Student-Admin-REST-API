const express = require('express')
const app = express();

const connectDB = require("./config/db")
const student_router = require("./routes/student")
const admin_router = require("./routes/admin")
const env = require("./config/dotenv")



app.use(express.json())
app.use('/api/student', student_router)
app.use('/api/admin', admin_router)

app.listen(env.PORT, async () => {
    console.log("Server started on PORT", env.PORT)
    if (await connectDB()) {
        console.log("Connected to DB")
    }
    else {
        console.log("Internal DB Error");
    }
})
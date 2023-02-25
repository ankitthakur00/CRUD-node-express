
const express = require("express")
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandlers")
const dotenv = require("dotenv").config()

connectDb()

const port =  process.env.PORT || 5000
const app = express()

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})
app.use(express.json());
app.use("/api/contacts/", require("./routes/contactRoutes"));
app.use("/api/users/", require("./routes/userRoutes"));
app.use(errorHandler)



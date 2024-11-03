const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const connectdb = require("./config/dbConnection");

const app = express();
connectdb();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser()); //  The cookie-parser middleware only parses incoming cookies and makes them available on req.cookies (and req.signedCookies if signed).

app.use("/api/contacts" , require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

// TODO : create admin routes to get all users and manage them
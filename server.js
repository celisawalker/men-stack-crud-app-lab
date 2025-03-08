// Here is where we import modules
// We begin by loading Express

//dependencies
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Session = require("./models/session");
const methodOverride = require("method-override");
const morgan = require("morgan");
// const methodOverride = require("method-override");
// const morgan = require("morgan");
//initialize the express application
const app = express();

//config code
dotenv.config()

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

//mount middleware functions here//body parser middleware: this function reads the request body and decodes it into req.body
//so we can access form data
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//method override reads the _method query paramater for delete or put requests

app.use(morgan("dev"));
//static asset middleware used to send static assets (CSS, images, DOM manipulation JS) to the client
app.use(express.static("public"));

//route to homepage
app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/sessions/new", async (req, res) => {
    res.render("sessions/new.ejs")
})

//path used to receive form submissions
app.post("/sessions", async (req, res) => {
     //conditional logic to handle the behavior of the HTML form checkbox fields;
    //we do this when we need a boolean instead of a string

    // if(req.body.isSent === "on"){
    //     req.body.isReadyToEat = true
    // }else{
    //     req.body.isReadyToEat = false
    // }

    //create the data in our database
    console.log(req.body);
    await Session.create(req.body);
    //redirect tells the client to navigate to a new url path/another page
    res.redirect("/sessions");// <- URL path
    // res.send("this page works!")
})

//shows list of sessions on sessions page
app.get("/sessions", async (req, res) => {
    const allSessions = await Session.find({});
    console.log(allSessions);
    res.render("sessions/index.ejs", {sessions: allSessions})
})

//show route for sending a page with the details for one particular fruit
app.get("/sessions/:sessionId", async (req, res) => {
    const foundSession = await Session.findById(req.params.sessionId)
    res.render("sessions/show.ejs", {session: foundSession});
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
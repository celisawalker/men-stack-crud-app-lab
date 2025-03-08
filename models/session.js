//This model is essentially a representation of a MongoDB collection. 
// By linking our schema to this model, we connect the defined structure of our fruit data 
// to the corresponding collection in the database.

const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
    name: String,
    boulderGrade: String,
    isSent: Boolean
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
//this module exports the fruit model
//the fruit model provides us with full CRUD functionality over our fruit selection in the fruits app database
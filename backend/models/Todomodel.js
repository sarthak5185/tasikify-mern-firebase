const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
   title:{
    type: String,
    require: [true, "Name is Required"],
    trim: true,
    maxlength: [25, "Name must be 25 Ch Long"],
  },
  tasks:{
    type: [{
        type: String
    }],
},
});
module.exports=mongoose.model("Todo",todoSchema)

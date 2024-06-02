const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const blogSchema = new Schema({

    name : {
        type : String, 
        required: true 
    },

    hour : {
        type : String, 
        required: false 
    },

  
}, {timestamps: true})

const Tasks = mongoose.model('Tasks', blogSchema)
module.exports = Tasks ;
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const blogSchema = new Schema({

    name : {
        type : String, 
        required: true 
    },

    hourreminder : {
        type : String, 
        required: false 
    },

    description : {
        type : String, 
        required: false 
    },

    hourcreated : {
        type : String, 
        required: false 
    },

    statue : {
        type : String, 
        required: false 
    },

    link : {
        type : String, 
        required: false 
    },

    comment : {
        type : String, 
        required: false 
    },

   
  
}, {timestamps: true})

const Tasks = mongoose.model('Tasks', blogSchema)
module.exports = Tasks ;
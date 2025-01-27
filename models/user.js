const mongoose= require('mongoose');
// modelo las base datos
// documents 
const userSchema =new mongoose.Schema({
    name: String,           
    email:String,        
    password:String,
             
    role:{
        type:String,
        // enum:['representante','maestro','controDeEstudio','director']
        default:'user'
    },       
    verificacion:{
        type:Boolean,
        default:false
    },
    Posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
    
    

    
    
})

// funcion para transformar datos cuando se solicite 
// returnedObject= lo que estoy solicitendo
userSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password; 
    }
})

const User = mongoose.model('User',userSchema);   

module.exports = User;
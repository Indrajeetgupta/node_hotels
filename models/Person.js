const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
            
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: String,
        required: true

    },
    username:{
        requireld: true,
        type: String

    },
    password:{
        required: true,
        type: String
    }

});

personSchema.pre('save', async  function(){
    const person = this;
    if(!person.isModified('password')) return ;
    try{
        //hash password generation

        const salt = await bcrypt.genSalt(10); 

        //hash password 
        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password  = hashedPassword;
    } catch(err){
        return next(err);

    }
})

personSchema.methods.comparePassword = async  function (candidatePassword) {
    try{

        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;

    }

}

const person = mongoose.model('person', personSchema);
module.exports = person;
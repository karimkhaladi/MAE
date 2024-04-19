const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"{PATH} is reauired "],
        validate:{
            validator:val=>/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    name:{
      type:String,
      required:[true,"{PATH} is reauired "],
    },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
      },
    phonenumber:{
      type:Number,
      required: [true, "{PATH} is required"],
      minlength: [8, "Phonenumber must be 8 numbers or longer"]
    },
    state:{
      type:String,
      required: [true, "{PATH} is required"],
      minlength: [3,"{PATH} must be 3 characters or longer "]
    },
    filename: {
      type: String,
    },
    workshops:{
      type:[String],
    }

}, {timestamps: true});


userSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );


userSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});


const bcrypt = require('bcrypt');


userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const user=mongoose.model("user",userSchema)
  module.exports=user
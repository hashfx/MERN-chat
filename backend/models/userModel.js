const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        picture: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },  // link to picture
    },
    {
        timestamps: true
    }
);

// match user entered password for login to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// encrypt password and store hash in database
userSchema.pre('save', async function(next){  // pre means 'before saving' perform function specified
    if(!this.isModified){
        next();  // don't run code after this
    }
    const salt = await bcrypt.genSalt(10);  // generate salt of 10 characters
    this.password = await bcrypt.hash(this.password, salt);  // hash password with salt
})

const User = mongoose.model("User", userSchema);
module.exports = User;
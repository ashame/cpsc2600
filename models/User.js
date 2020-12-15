const { model, Schema } = require('mongoose');

const userSchema = new Schema({ //TODO: reference restaurant id(s)?
    username: {
        type: String, required: true, unique: true
    }, 
    password: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    sessionId: String
});

userSchema.statics.findBySession = function(sessionId) { 
    return this.find({sessionId});
}

const User = model("users", userSchema);

module.exports = { model: User, Schema: userSchema };
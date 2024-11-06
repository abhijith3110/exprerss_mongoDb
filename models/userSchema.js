import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true

    },
    age: {

        type: Number,
        required: true

    }
    
}, {

    timestamps: true

});

const UserModel = mongoose.model('user', userSchema);

export default UserModel;

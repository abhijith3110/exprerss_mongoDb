import UserModel from "../models/userSchema.js";

//Create User
export const createUser = async (req, res, next) => {
    try {
        const { name, age } = req.body;
        if (name && age) {
            const userCreate = await UserModel.create({ name, age });
            res.status(201).json({ message: `${userCreate.name} is created Successfully`, data: userCreate });
        } else {
            res.status(400).json({ message: "All fields are mandatory" });
        }
    } catch (error) {
        next(new Error(`Failed to Create User ,  Please try again later.`));
    }
};

//list all users

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({ message: "Users get Sucessfully", data: users })
    } catch (error) {
        next(new Error(`Failed to get users. Please try again later.`));
    }
}

//list one user

export const getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            const user = await UserModel.findById(id)
            if (user) {
                res.status(200).json({ message: `${user.name}'s details get Successfuly`, data: user })
            } else {
                res.status(404).json({ message: "User not Found" })
            }
        } else {
            res.status(400).json({ message: "User ID Required" })
        }
    } catch (error) {
        console.log(error);
        next(new Error(`Failed to get user with ID ${req.params.id}. Please try again later.`));
    }
}


//Update User

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = { ...req.body };

        if (id) {
            const updatedUserData = await UserModel.findByIdAndUpdate(id, userData, { new: true });

            if (updatedUserData) {
                res.status(200).json({ message: "User updated successfully", data: updatedUserData });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } else {
            res.status(400).json({ message: "User ID is required" });
        }
    } catch (error) {
        console.log(error);
        next(new Error(`Failed to update user with ID ${req.params.id}. Please try again later.`));
    }
};


//delete user

export const deleteUser = async (req,res,next)=>{
    try {
        const {id} = req.params
        const user = await UserModel.findByIdAndDelete(id);
        if (user) {
            res.status(200).json({ message: "User deleted successfully", data: user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        next(new Error(`Failed to delete user with ID ${req.params.id}. Please try again later.`));
    }
}
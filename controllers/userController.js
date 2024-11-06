import UserModel from "../models/userSchema.js";

//Create User

// export const createUser = async (req, res, next) => {
//     try {
//         const { name, age } = req.body;
//         if (name && age) {
//             const userCreate = await UserModel.create({ name, age });
//             console.log(typeof(userCreate));
//             res.status(201).json({ message: `${userCreate.name} is created Successfully`, data: userCreate });
//         } else {
//             res.status(400).json({ message: "All fields are mandatory" });
//         }
//     } catch (error) {
//         next(new Error(`Failed to Create User ,  Please try again later.`));
//     }
// };


export const createUser = async (req, res, next) => {

    try {

        const { name, age } = req.body;
        const  userImage = req.file.path;

        try {
            
            const userCreate = new UserModel({ name, age, image: userImage})
            await userCreate.save();
            res.status(201).json({ message: `${userCreate.name} is Created Successfully`, data: userCreate })

        } catch (error) {
            console.log(error);
        }

    } catch (error) {

        next(new Error("Internal Server Error"))
        res.status(500).json({ message: "Failed to get users. Please try again later." })

    }

}


//list all users

export const getAllUsers = async (req, res, next) => {

    try {

        const allUsers = await UserModel.find()
        console.log(typeof (allUsers));
        res.status(200).json({ message: "Users Get Successfully", data: allUsers })

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: "INTERNAL SERVER ERROR " });
        next(new Error(" Failed to get users. Please try again later. "));

    }

}


//list one user


// export const getOneUser = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         if (id) {
//             const user = await UserModel.findById(id)
//             console.log(typeof (user));
//             if (user) {
//                 res.status(200).json({ message: `${user.name}'s details get Successfuly`, data: user })
//             } else {
//                 res.status(404).json({ message: "User not Found" })
//             }
//         } else {
//             res.status(400).json({ message: "User ID Required" })
//         }
//     } catch (error) {
//         console.log(error);
//         next(new Error(`Failed to get user with ID ${req.params.id}. Please try again later.`));
//     }
// }

export const getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            const user = await UserModel.findOne({ _id: id })
            console.log(typeof (user));
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

// export const updateUser = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const userData = { ...req.body };

//         if (id) {
//             const updatedUserData = await UserModel.findByIdAndUpdate(id, userData, { new: true });
//             console.log(typeof (updatedUserData));

//             if (updatedUserData) {
//                 res.status(200).json({ message: "User updated successfully", data: updatedUserData });
//             } else {
//                 res.status(404).json({ message: "User not found" });
//             }
//         } else {
//             res.status(400).json({ message: "User ID is required" });
//         }
//     } catch (error) {
//         console.log(error);
//         next(new Error(`Failed to update user with ID ${req.params.id}. Please try again later.`));
//     }
// };


export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = { ...req.body };

        if (id) {
            const updatedUserData = await UserModel.findOneAndUpdate({ _id: id }, { $set: userData }, { new: true, runValidators: true });
            console.log(typeof (updatedUserData));

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

// export const deleteUser = async (req, res, next) => {

//     try {
//         const { id } = req.params
//         if (id) {

//             const user = await UserModel.findByIdAndDelete(id);
//             console.log(typeof (user));

//             if (user) {

//                 res.status(200).json({ message: "User deleted successfully", data: user });

//             } else {

//                 res.status(404).json({ message: "User not found" });
//             }

//         } else {

//             res.status(400).json({ message: "User ID is required" });

//         }
//     } catch (error) {

//         console.log(error);
//         next(new Error(`Failed to delete user with ID ${req.params.id}. Please try again later.`));

//     }

// }

export const deleteUser = async (req, res, next) => {

    try {
        const { id } = req.params
        if (id) {

            const user = await UserModel.findOneAndDelete({ _id: id });
            console.log(typeof (user));

            if (user) {

                res.status(200).json({ message: "User deleted successfully", data: user });

            } else {

                res.status(404).json({ message: "User not found" });
            }

        } else {

            res.status(400).json({ message: "User ID is required" });

        }
    } catch (error) {

        console.log(error);
        next(new Error(`Failed to delete user with ID ${req.params.id}. Please try again later.`));

    }

}
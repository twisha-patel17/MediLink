import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type:String, required: true, trim: true
    },
    email: {
        type: String, required: true, unique: true, trim: true, lowercase: true
    },
    password: {
        type: String, default: null,
    },
    profilePicture: {
        type: String, default: "",
    },
    googleId: {
        type: String, default: null,
    },
    recentSearches: 
    [{
        type: String
    }],
    savedPlaces: [
        {
            placeId:{
                type: String
            },
            placeName: {
                type: String
            },
            placeType: {
                type: String
            }
        }
    ]
    
},
   {
       timestamps: true
   }
);

const User = mongoose.model("User", userSchema);

export default User
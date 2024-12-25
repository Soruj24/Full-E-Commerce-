const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcryptjs for password hashing

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true, // Removes leading/trailing spaces
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [100, 'Name can not exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true, // Convert email to lowercase automatically
            validate: {
                validator: (v) => {
                    // Simple email validation regex
                    return /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
                },
                message: 'Please enter a valid email address',
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
         
        image: {
            type: String,
            default: ' default.png',
        },
        isAdmin: {
            type: Boolean,
            default: false, // Indicates whether the user has admin privileges
        },
        isBanned: {
            type: Boolean,
            default: false, // Tracks if the user is banned
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Password hashing middleware before saving the document
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if the password hasn't been modified
    }

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt with rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error); // Pass errors to next middleware
    }
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

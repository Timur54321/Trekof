const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Пожалуйста укажите ник"]
        },
        photoKey: String,
        email: {
            type: String,
            required: [true, "Пожалуйста укажите свой e-mail"],
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        role: {
            type: String,
            required: [true, "не указана уровень пользователя"],
            enum: ['user', 'artist', 'moderator', 'admin'],
            default: 'user'
        },
        password: {
            type: String,
            required: [true, 'Введите пароль'],
            minlength: 8,
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Пожалуйста подтвердите пароль'],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: 'Пароли не совпадают!'
            }
        },
        favourites: {
            type: mongoose.Schema.ObjectId,
            ref: "Playlist"
        },
        friends: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        ],
        followedChannels: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Channel"
            }
        ],
        followedArtists: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        ],
        chats: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Chat"
            }
        ]
    }
);

userSchema.pre('save', async function(next) {
    // Only run this function if password was modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.virtual('playlists', {
    ref: 'Playlist',
    localField: '_id',
    foreignField: 'author'
});

userSchema.methods.correctPassword = function(candidatePassword, userPassword) {
    return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
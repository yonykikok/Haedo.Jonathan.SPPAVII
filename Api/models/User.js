const { model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            maxLength: 15
        },
        passwordHash: {
            type: String,
            required: true,
        },
        favorito: Boolean
    }
);
userSchema.set('toJSON', {
    transform: ((document, userToJSON) => {
        userToJSON.id = userToJSON._id.toString();
        delete userToJSON._id;
        delete userToJSON.__v;
        delete userToJSON.passwordHash;
    })
});

module.exports = model('User', userSchema);
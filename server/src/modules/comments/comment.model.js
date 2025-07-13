const { Schema, model } = require('mongoose');

const CommentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        storyID: {
            type: Schema.Types.ObjectId,
            ref: 'stories',
            required: true
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'auths',
            required: true
        }
    },
    { timestamps: true }
);

const CommentModel = model('comments', CommentSchema);

module.exports = CommentModel;

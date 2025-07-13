const { Schema, model } = require('mongoose');

const VoteSchema = new Schema(
    {
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

const VoteModel = model('votes', VoteSchema);

module.exports = VoteModel;

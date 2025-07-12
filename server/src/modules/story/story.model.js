const { Schema, model } = require('mongoose');

const StorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        url: {
            type: String,
            required: true,
            trim: true
        },
        domain: {
            type: String,
            required: true,
            trim: true
        },
        tags: {
            type: [String],
            required: true,
            default: []
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'auths',
            required: true
        }
    },
    { timestamps: true }
);

const StoryModel = model('stories', StorySchema);

module.exports = StoryModel;

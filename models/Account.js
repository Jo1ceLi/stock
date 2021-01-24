const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        createdate: {
            type: Date,
            required: true
        }
    }
)
const accountModel = mongoose.model('account', accountSchema);

module.exports = accountModel;
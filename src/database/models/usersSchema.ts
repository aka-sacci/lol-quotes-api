import { Schema } from 'mongoose';

const usersSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
})

module.exports = usersSchema;
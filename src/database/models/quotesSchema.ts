import { Schema } from 'mongoose';

const quotesSchema = new Schema({
    champion: {
        type: String,
        require: true
    },
    quote: {
        type: String,
        require: true
    },
    length: {
        type: Number,
        require: true
    },
})

module.exports = quotesSchema;
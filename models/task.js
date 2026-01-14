const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    text: { type: String, required: true }, // ist davür da das es ein String sein muss und ein text haben muss sonst kann auch in die Db etwas reingeschickt werden was keinen "text" hat
    completed: { type: Boolean, default: false },
    tags: {
        type: [String],  // Array von Strings
        default: []      // Standardwert: leeres Array
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    date: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Spezieller Typ!
        ref: 'User',  // Referenz zur User-Collection
        required: true
    }
});

const Task = mongoose.model('Todo', taskSchema);
module.exports = Task;


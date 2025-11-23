const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    text: { type: String, required: true } // ist davür da das es ein String sein muss und ein text haben muss sonst kann auch in die Db etwas reingeschickt werden was keinen "text" hat

});

const Task = mongoose.model('Todo', taskSchema);
module.exports = Task;
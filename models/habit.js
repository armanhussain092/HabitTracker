const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: String,
  description: String,  
  days: {
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thursday: String,
    Friday: String,
    Saturday: String,
    Sunday: String,
  },
});

module.exports = mongoose.model('Habit', habitSchema);

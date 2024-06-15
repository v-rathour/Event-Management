const mongoose = require('mongoose');
const Review = require('./Review');
const User = require('./User')

let EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  eventdate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  eventLink: {
    type: String,
    required: true,
    trim: true,
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});


let Event = mongoose.model('Event', EventSchema);
module.exports= Event;
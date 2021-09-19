import * as mongoose from 'mongoose';

const DaySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  data: [],
});

export const Day = mongoose.model('Day', DaySchema);

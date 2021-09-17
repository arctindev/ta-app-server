import * as mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
});

export const Service = mongoose.model('Service', ServiceSchema);

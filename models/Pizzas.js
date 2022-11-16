import mongoose from 'mongoose';

const PizzasSchema = new mongoose.Schema({});

export default mongoose.model('Pizza', PizzasSchema);

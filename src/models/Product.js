import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
import Product from '../models/Product.js';

class ProductDAO {
  async findAll(query, { limit = 10, page = 1, sort }) {
    const searchQuery = query ? { $or: [{ category: query }, { available: query === 'true' }] } : {};
    const sortOrder = sort === 'desc' ? -1 : 1;

    const products = await Product.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort ? { price: sortOrder } : {});

    return products;
  }

  async findById(productId) {
    return await Product.findById(productId);
  }

  async updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    if (product.stock < quantity) {
      throw new Error(`Stock insuficiente para el producto ${product.name}`);
    }
    product.stock -= quantity;
    return await product.save();
  }
}

export default new ProductDAO();

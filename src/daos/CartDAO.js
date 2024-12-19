import Cart from '../models/Cart.js';

class CartDAO {
  async findById(cartId) {
    return await Cart.findById(cartId).populate('products.product');
  }

  async updateCart(cartId, updates) {
    return await Cart.findByIdAndUpdate(cartId, updates, { new: true });
  }

  async clearCart(cartId) {
    return await Cart.findByIdAndUpdate(cartId, { products: [] }, { new: true });
  }
}

export default new CartDAO();

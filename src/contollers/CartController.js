import CartDAO from '../daos/CartDAO.js';
import ProductDAO from '../daos/ProductDAO.js';
import TicketService from '../services/TicketService.js';

export const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const user = req.user;

  try {
    const cart = await CartDAO.findById(cid);
    const notProcessed = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await ProductDAO.findById(item.product._id);

      if (product.stock >= item.quantity) {
        await ProductDAO.updateStock(product._id, item.quantity);
        totalAmount += product.price * item.quantity;
      } else {
        notProcessed.push(item.product._id);
      }
    }

    const ticket = await TicketService.generateTicket({
      code: `T-${Date.now()}`,
      amount: totalAmount,
      purchaser: user.email,
    });

    cart.products = cart.products.filter((item) => notProcessed.includes(item.product._id));
    await cart.save();

    res.json({
      status: 'success',
      ticket,
      notProcessed,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

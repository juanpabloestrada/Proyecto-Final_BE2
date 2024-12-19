import Ticket from '../models/Ticket.js';

class TicketService {
  async generateTicket(data) {
    return await Ticket.create(data);
  }
}

export default new TicketService();

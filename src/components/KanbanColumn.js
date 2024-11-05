import React from 'react';
import Ticket from './Ticket';

const KanbanColumn = ({ title, tickets }) => (
  <div className="kanban-column">
    <h2>{title}</h2>
    <div className="tickets-container">
      {tickets.map(ticket => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  </div>
);

export default KanbanColumn;

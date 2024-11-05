import React from 'react';
import './Ticket.css';

const Ticket = ({ ticket }) => (
  <div className="ticket">
    <div className="ticket-header">
      <span className="ticket-id">{ticket.id}</span>
      <span className="ticket-avatar">
        <img src="https://via.placeholder.com/30" alt="User Avatar" />
      </span>
    </div>
    <h3 className="ticket-title">{ticket.title}</h3>
    <div className="ticket-footer">
      <span className={`priority-icon priority-${ticket.priority}`}>!</span>
      <span className="ticket-tag">{ticket.tag[0]}</span>
    </div>
  </div>
);

export default Ticket;

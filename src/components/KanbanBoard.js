import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import GroupSelector from './GroupSelector';

const KanbanBoard = ({ tickets, users }) => {
  const [groupBy, setGroupBy] = useState('status'); // Default grouping
  const [sortedBy, setSortedBy] = useState('priority'); // Default sorting
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('kanbanState'));
    if (savedState) {
      setGroupBy(savedState.groupBy);
      setSortedBy(savedState.sortedBy);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'kanbanState',
      JSON.stringify({ groupBy, sortedBy })
    );
  }, [groupBy, sortedBy]);

  useEffect(() => {
    let sortedTickets = [...tickets];

    if (sortedBy === 'priority') {
      sortedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortedBy === 'title') {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredTickets(sortedTickets);
  }, [sortedBy, tickets]);

  const handleGroupingChange = (group) => setGroupBy(group);

  return (
    <div>
      <GroupSelector onGroupChange={handleGroupingChange} onSortChange={setSortedBy} />
      <div className="kanban-board">
        {renderGroupedColumns(filteredTickets, groupBy, users)}
      </div>
    </div>
  );
};

function renderGroupedColumns(tickets, groupBy, users) {
  const grouped = groupTickets(tickets, groupBy, users);
  return Object.keys(grouped).map((key) => (
    <KanbanColumn key={key} title={key} tickets={grouped[key]} />
  ));
}

function groupTickets(tickets, groupBy, users) {
  const grouped = {};
  tickets.forEach((ticket) => {
    let groupKey;
    if (groupBy === 'status') groupKey = ticket.status;
    else if (groupBy === 'user') groupKey = users.find(u => u.id === ticket.userId)?.name || 'Unassigned';
    else if (groupBy === 'priority') {
      groupKey = ["No priority", "Low", "Medium", "High", "Urgent"][ticket.priority];
    }

    if (!grouped[groupKey]) grouped[groupKey] = [];
    grouped[groupKey].push(ticket);
  });
  return grouped;
}

export default KanbanBoard;

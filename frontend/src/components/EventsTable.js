import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api';

const EventsTable = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then(response => {
        setEventData(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div className="table-container">
      <h2>Events</h2>
      {eventData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            {eventData.map(event => (
              <tr key={event.id}>
                <td>{new Date(event.Date).toLocaleDateString()}</td>
                <td>{event.Event}</td>
                <td>{event.Impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default EventsTable;

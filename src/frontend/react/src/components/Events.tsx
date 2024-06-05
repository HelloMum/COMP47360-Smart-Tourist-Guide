import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 确保正确定义接口
interface Event {
  id: number;
  image: string;
  name: string;
  time: string;
  location: string;
}

// 使用虚拟数据
const dummyEvents: Event[] = [
  {
    id: 1,
    image: '/path/to/image1.jpg',
    name: 'Event 1',
    time: '10:00 AM',
    location: 'Location 1'
  },
  {
    id: 2,
    image: '/path/to/image2.jpg',
    name: 'Event 2',
    time: '11:00 AM',
    location: 'Location 2'
  }
];

const Events: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Event[]>(dummyEvents); // 使用虚拟数据填充结果
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟搜索请求，暂时使用虚拟数据
    // const response = await fetch(`http://localhost:5000/search?query=${query}`);
    // const data = await response.json();
    setResults(dummyEvents);
  };

  const goToSchedule = () => {
    navigate('/schedule');
  };

  return (
    <div>
      <h1>Events</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for events or locations"
        />
        <button type="submit">Search</button>
      </form>
      <div className="event-list">
        {results.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.name} className="event-image" />
            <div className="event-details">
              <h3>{event.name}</h3>
              <p>{event.time}</p>
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={goToSchedule}>Go to Schedule</button>
    </div>
  );
};

export default Events;

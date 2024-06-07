import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button as AntButton } from 'antd';
import EventCard from './EventCard';
import './Events.css'; // 引入CSS文件

// 定义 Event 接口
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
    image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    name: 'Event 1',
    time: '10:00 AM',
    location: 'Location 1'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
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
    <div className="events-container">
      <div className="search">
        <form className="search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for events or locations"
            className="search-input"
          />
          <AntButton type="primary">Search</AntButton>
        </form>
      </div>
      <br />

      <div className="event-list">
        {results.map(event => (
          <EventCard
            key={event.id}
            image={event.image}
            name={event.name}
            time={event.time}
            location={event.location}
          />
        ))}
      </div>

      <AntButton type="primary" onClick={goToSchedule}>Go to Schedule</AntButton>
    </div>
  );
};

export default Events;

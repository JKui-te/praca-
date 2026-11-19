'use client';

import { useState } from 'react';

export default function GreetingsFetcher() {
  const [greetings, setGreetings] = useState([]);

  async function loadGreetings() {
    const res = await fetch('/api/greetings');
    const data = await res.json();
    setGreetings(data);
  }

  return (
    <div>
      <button onClick={loadGreetings}>Pobierz powitania</button>
      <ul>
        {greetings.map((g) => (
          <li key={g.id}>{g.message}</li>
        ))}
      </ul>
    </div>
  );
}
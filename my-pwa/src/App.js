import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [ngrams, setNgrams] = useState([]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    // Send text to Express backend
    await fetch('/send-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    // Fetch ngrams from Express backend
    const response = await fetch('/send-text');
    const data = await response.json();
    setNgrams(data);
  };

  return (
    <div className="App">
      <input type="text" value={text} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        {ngrams.map((ngram, index) => (
          <p key={index}>{ngram}</p>
        ))}
      </div>
    </div>
  );
}

export default App;

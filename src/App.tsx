import './App.scss';

import React, { useState } from 'react';

import { PlaceCard } from './components/place-card';

function App() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [generating, setGenerating] = useState(false);
  const [names, setNames] = useState<string[]>([]);

  function onGenerateButtonClick() {
    setGenerating(true);
    console.log(textAreaValue);

    // Split the textarea value by line breaks
    const names = textAreaValue.split('\n');
    setNames(names);

    console.log(names);
  }

  // Create a state variable to store the value of the textarea

  // Event handler to update the state when the textarea value changes
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  return (
    <div className='App'>
      {!generating && (
        <div className='insert-form'>
          <textarea
            className='text-area'
            placeholder='Insert names'
            rows={20}
            cols={20}
            value={textAreaValue}
            onChange={handleTextAreaChange}
          />
          <button className='generate-button' onClick={onGenerateButtonClick}>
            Generate
          </button>
        </div>
      )}
      {generating && (
        <div className='place-cards'>
          {names.map((name, index) => (
            <PlaceCard key={index} name={name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

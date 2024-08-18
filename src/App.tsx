import './App.scss';

import React, { useState } from 'react';

import { PlaceCard } from './components/place-card';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [generating, setGenerating] = useState(false);
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function onGenerateButtonClick() {
    setGenerating(true);
    const names = textAreaValue.split('\n');
    const remainder = 6 - (names.length % 6);
    for (let i = 0; i < remainder; i++) {
      names.push('');
    }
    setNames(names);
  }

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const exportToPdf = () => {
    setLoading(true);
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const cardGroups = Array.from(document.querySelectorAll('.place-cards-a4'));

    const promises = cardGroups.map((group) => {
      return html2canvas(group as HTMLElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        return { imgData, imgWidth, imgHeight };
      });
    });

    Promise.all(promises).then((images) => {
      images.forEach((image, index) => {
        if (index > 0) {
          pdf.addPage();
        }
        pdf.addImage(image.imgData, 'PNG', 0, 0, image.imgWidth, image.imgHeight);
      });

      // Save the PDF after all images have been added
      pdf.save('place-cards.pdf');
      setLoading(false);
    });
  };

  // Utility function to chunk the names array into groups of 6
  const chunkArray = (array: string[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const groupedNames = chunkArray(names, 6);

  return (
    <div className='App'>
      {loading && <div className='loading'>Loading...</div>}
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
        <>
          <button className='export-button' onClick={exportToPdf}>
            Export to PDF
          </button>
          <div className='place-cards'>
            {groupedNames.map((group, groupIndex) => (
              <div key={groupIndex} className='place-cards-a4'>
                {group.map((name, index) => (
                  <PlaceCard key={index} name={name} />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

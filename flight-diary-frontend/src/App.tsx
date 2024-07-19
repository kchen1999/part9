import { useState, useEffect } from 'react';
import { getAllEntries, createEntry } from './diaryService';
import { DiaryEntry, NewDiaryEntry } from './types';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorNotification, setErrorNotification] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getAllEntries().then(data => setDiaryEntries(data));
  }, []);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    } as NewDiaryEntry;
    createEntry(entryToAdd).then(data => {
      if(typeof(data) === 'string') {
        setErrorNotification(data);
      }
      else {
        setDiaryEntries(diaryEntries.concat(data));
        setErrorNotification('');
      }
    });
    setNewDate('');
    setNewVisibility('');
    setNewWeather('');
    setNewComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{color: "red"}}>{errorNotification}</p>
      <form onSubmit={diaryEntryCreation}>
      <div>
        date
        <input 
          type='date'
          onChange={(event) => setNewDate(event.target.value)}
        />
        </div>
        <div>
        <span style={{marginRight: 12}}>visibility</span>
        great <input type='radio' value='great' name='visibility' onChange={(event) => setNewVisibility(event.target.value)}/>
        good <input type='radio' value='good' name='visibility' onChange={(event) => setNewVisibility(event.target.value)}/>
        ok <input type='radio' value='ok' name='visibility' onChange={(event) => setNewVisibility(event.target.value)}/>
        poor <input type='radio' value='poor' name='visibility' onChange={(event) => setNewVisibility(event.target.value)}/>
        </div>
        <div>
        <span style={{marginRight: 12}}>weather</span>
        sunny <input type='radio' value='sunny' name='weather' onChange={(event) => setNewWeather(event.target.value)}/>
        rainy <input type='radio' value='rainy' name='weather' onChange={(event) => setNewWeather(event.target.value)}/>
        cloudy <input type='radio' value='cloudy' name='weather' onChange={(event) => setNewWeather(event.target.value)}/>
        stormy <input type='radio' value='stormy' name='weather' onChange={(event) => setNewWeather(event.target.value)}/>
        windy <input type='radio' value='windy' name='weather' onChange={(event) => setNewWeather(event.target.value)}/>
        </div>
        <div>
        comment
        <input 
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      {diaryEntries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      )
      )}
    </div>
  );
};

export default App;

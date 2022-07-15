import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import {useState} from 'react';
import { Timestamp, EditableTimestamp } from './timestamp.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

export function MyStopwatch() {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const [timestamps, setTimestamps] = useState([]);
  const [description, setDescription] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTimestampKey, setEditedTimestampKey] = useState(null);

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleEditDescription = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleAddTimestamp = () => {
    setTimestamps([...timestamps, {key: uuidv4(), time: {
      minutes: minutes, seconds: seconds, hours: hours
    }, description: description}]);
    setDescription('');
  };

  const handleDeleteTimestamp = ({key}) => {
    let deletedIndex = timestamps.findIndex((timestamp) => timestamp.key === key);
    setTimestamps([...timestamps.slice(0, deletedIndex), ...timestamps.slice(deletedIndex+1)]);
  };

  const handleEditTimestamp = (timestamp) => {
    setEditedTimestampKey(timestamp.key);
  };

  const handlePlayPause = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }

  const handleSaveTimestamp = (timestamp) => {
    let editedIndex = timestamps.findIndex((tmstmp) => tmstmp.key === timestamp.key);
    setTimestamps([...timestamps.slice(0, editedIndex), {key: timestamp.key, description: editedDescription, time: timestamp.time}, 
      ...timestamps.slice(editedIndex+1)]);
    setEditedTimestampKey(null);
    setEditedDescription('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTimestamp();
    }
  };

  useEffect(() => {
    const tsmps = JSON.parse(localStorage.getItem('timestamps'));
    if (tsmps !== []) {
      setTimestamps(tsmps);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timestamps', JSON.stringify(timestamps));
  }, [timestamps]);

  const handleClearLocalStorage = () => {
    setTimestamps([]);
  };  



  return (
    <div className={`bg-gray-900 text-center w-80 h-screen`}>
      <div className='rounded-md border-white border-2 mb-2'> 
        <div className='text-white'>
      <h1 className='mb-1 text-lg'>Timestamps</h1>
      <div className='flex justify-center align-text-bottom mb-2'>
        <p className='text-md rounded-sm border-white border-2 p-1'> <span>{hours < 10 ? '0' + hours : hours}</span>:<span>{minutes < 10 ? '0' + minutes : minutes}</span>:<span>{seconds < 10 ? '0' + seconds : seconds}</span> </p>
      <div className='ml-3 flex align-middle'> 
      <button onClick={handlePlayPause}>
        { isRunning ? 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg> :
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg> }
      </button>
      <button onClick={reset}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      </div>
      </div>
      </div>
      <div className='flex justify-center mb-2'> 
      <input
          className='rounded-md'
          value={description}
          type="text"
          placeholder="Timestamp"
          onChange={handleChangeDescription}
          onKeyPress={handleKeyPress}
        />
      <button onClick={handleAddTimestamp} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg text-xxs ml-1'> Add TS </button>
      </div>
      <div>
      {timestamps.map((timestamp) => ( 
        editedTimestampKey === timestamp.key ? 
        <EditableTimestamp key={timestamp.key} editedDescription={editedDescription}  handleEditDescription={handleEditDescription} 
          handleSaveTimestamp={() => {handleSaveTimestamp(timestamp)}} time={timestamp.time} 
          description={timestamp.description} handleDeleteTimestamp={() => {handleDeleteTimestamp(timestamp)}} 
          handleEditTimestamp={() => {handleEditTimestamp(timestamp)}}/>
          : <Timestamp key={timestamp.key} time={timestamp.time} description={timestamp.description} handleDeleteTimestamp={() => {handleDeleteTimestamp(timestamp)}} 
            handleEditTimestamp={() => {handleEditTimestamp(timestamp)}}/> 
      ))}
      { timestamps.length ? <button className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded-lg text-xxs ml-1 mb-2' onClick={handleClearLocalStorage}> Clear </button> : <></>}
      </div>
      </div>
    </div>
  );
};
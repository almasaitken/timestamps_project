import React from 'react';
import './timestamp.css';

export const Timestamp = ({time, description, handleDeleteTimestamp, handleEditTimestamp}) => {
    return (
        <div className='flex text-white justify-between gap-2 items-center align-middle'>
            <div> {time.hours}:{time.minutes}:{time.seconds} - {description}</div>
            <div className='flex gap-1'>
            <button onClick={handleEditTimestamp}> 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button> 
            <button onClick={handleDeleteTimestamp}> 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            </div>
        </div>
    )
}

export const EditableTimestamp = ({time,description, handleDeleteTimestamp, handleSaveTimestamp, handleEditDescription, editedDescription}) => {
    let descriptionSubstitute = description;
    return (
        <div className='flex text-white justify-between gap-2 items-center align-middle'>
            <div className=''> {time.hours}:{time.minutes}:{time.seconds}
                -
                <input className="bg-white border-r-2 text-gray-700 leading-tight focus:outline-none ml-2" type="text" onChange={handleEditDescription}  placeholder={descriptionSubstitute} />
            </div>
            <div className='flex gap-1'>
            <button onClick={handleSaveTimestamp}> 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button> 
            <button onClick={handleDeleteTimestamp}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            </div>
        </div>
    )
}
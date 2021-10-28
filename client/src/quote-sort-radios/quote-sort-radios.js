import { useState, useEffect, useRef } from 'react';

const QuoteSortRadios = () => {
  // --------------------------------------------
  return (
    <div
      style={{
        border: 'dashed darkorange 2px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          // border: 'solid lightblue 2px',
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '400px',
        }}
      >
        <p>Sort by: </p>
        <div>
          <input type='radio' id='huey' name='drone' value='huey' checked />
          <label htmlFor='huey'>Anonymous Users</label>
        </div>

        <div>
          <input type='radio' id='dewey' name='drone' value='dewey' disabled />
          <label htmlFor='dewey'>Registered Users</label>
        </div>
      </div>
    </div>
  );
  // --------------------------------------------
};

// ==============================================

export default QuoteSortRadios;

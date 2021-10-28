import { useState, useEffect, useRef } from 'react';

const QuoteForm = ({
  setNewQuote,
  newQuote,
  attributedTo,
  setAttributedTo,
  submittedBy,
  setSubmittedBy,
  setQuotes,
  sort_votes,
}) => {
  // --------------------------------------------
  return (
    <form>
      <label htmlFor='quote'>
        <input
          id='quote-input'
          // name='quote-input'
          type='text'
          onChange={(e) => setNewQuote(e.target.value)}
          value={newQuote}
          placeholder='quote'
        />
      </label>

      <br />

      <label htmlFor='attributed-to-input'>
        <input
          id='attributed-to'
          // name='attributed-to-input'
          type='text'
          onChange={(e) => setAttributedTo(e.target.value)}
          value={attributedTo}
          placeholder='attributed to'
        />
      </label>

      <br />

      <label htmlFor='submitted-by-input'>
        <input
          id='submitted-by-input'
          // name='submitted-by-input'
          type='text'
          onChange={(e) => setSubmittedBy(e.target.value)}
          value={submittedBy}
          placeholder='your name'
        />
      </label>

      <br />

      <button
        type='submit'
        onClick={(e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_BACKEND}/quotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              quote: newQuote,
              attributed_to: attributedTo,
              submitted_by: submittedBy,
              vote_up: 0,
              vote_down: 0,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
              setQuotes([...sort_votes(data)]);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }}
      >
        Submit Quote
      </button>
    </form>
  );
  // --------------------------------------------
};

// ==============================================

export default QuoteForm;

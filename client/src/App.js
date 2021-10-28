import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import QuoteForm from './quote-form/quote-form';
import QuoteSortRadios from './quote-sort-radios/quote-sort-radios';
import QuoteCards from './quote-cards/quote-cards';

// ==============================================

// import logo from './logo.svg';
import './App.css';

// ==============================================

const Comp1 = () => {
  return <h5>Comp-1</h5>;
};

// ==============================================

const Comp2 = () => {
  return <h5>Comp-2</h5>;
};

// ==============================================

const App = () => {
  // --------------------------------------------

  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState('');
  const [attributedTo, setAttributedTo] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');

  // --------------------------------------------

  const sort_votes = (data) => {
    return data.sort((a, b) => (a.vote_up < b.vote_up ? 1 : -1));
  };

  // --------------------------------------------

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/quotes`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setQuotes(sort_votes(data));
      })
      .catch((err) => {
        console.log('JOSH .catch()');
        console.log('error: ', err);
      });
  }, []);

  // --------------------------------------------

  useEffect(() => {
    console.log('quotes: ', quotes);
  }, [quotes]);

  // --------------------------------------------

  return (
    <div className='App'>
      <Route path='/1'>
        <Comp1 />
      </Route>

      <Route path='/2'>
        <Comp2 />
      </Route>

      <QuoteForm
        setNewQuote={setNewQuote}
        newQuote={newQuote}
        attributedTo={attributedTo}
        setAttributedTo={setAttributedTo}
        submittedBy={submittedBy}
        setSubmittedBy={setSubmittedBy}
        setQuotes={setQuotes}
        sort_votes={sort_votes}
      />

      <QuoteSortRadios />

      <QuoteCards
        quotes={quotes}
        setQuotes={setQuotes}
        sort_votes={sort_votes}
      />
    </div>
  );

  // --------------------------------------------
};

// ==============================================

export default App;

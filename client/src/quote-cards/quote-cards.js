import QuoteCard from '../quote-card/quote-card';

// ==============================================

const QuoteCards = ({ quotes, setQuotes, sort_votes }) => {
  return (
    <ul style={{ listStyle: 'none' }}>
      {quotes &&
        quotes.map((quote) => {
          return (
            <li key={quote.quote_id} style={{ marginTop: '10px' }}>
              <hr />
              <QuoteCard
                quote={quote}
                setQuotes={setQuotes}
                sort_votes={sort_votes}
              />
            </li>
          );
        })}
    </ul>
  );
};

// ==============================================

export default QuoteCards;

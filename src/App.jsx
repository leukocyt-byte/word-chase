import { useState, useEffect } from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [query, setQuery] = useState('');
  const [word, setWord] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      setQuery(e.target.value);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const identifier = setTimeout(() => {
      fetch(
        `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${apiKey}`
      )
        .then((res) => res.json())
        .then((result) => {
          setQuery('');
          setWord(result);
          console.log(result);
        })
        .catch((error) => console.log(error));
    }, 700);

    return () => {
      console.log('Cleanup');
      clearTimeout(identifier);
    };
  }, [query]);

  !word && console.log(word);

  return (
    <div className="App">
      <section>
        <input
          type="text"
          placeholder="SEARCH"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        ></input>
      </section>
      <section></section>
    </div>
  );
}

export default App;

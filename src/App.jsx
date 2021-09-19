import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [word, setWord] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery('');
          setWord(result);
          console.log(result);
        });
    }
  };

  return (
    <div className="App">
      <section>
        <input
          type="text"
          placeholder="SEARCH"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        ></input>
      </section>
      <section></section>
    </div>
  );
}

export default App;

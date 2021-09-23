import { useState, useEffect } from 'react';

//const apiKey = process.env.REACT_APP_API_KEY;

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
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
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
      <section>
        {/* <ul>
          {Array.from(word).map((w, index) => {
            return (
              <li key={index}>
                <div>
                  <div>
                    <h3>{w.meta.id}</h3>
                    <p>Phonetic: {w.meta.id} </p>
                    <p>Origin: {w.meta.id} </p>
                    <p>Definition1: {w.def[0].sseq[0][0][1].dt[0][1]}</p>
                    <p>Definition2: {w.meta.id}</p>
                  </div>
                </div>
              </li>
            );
          })} </ul> */}
      </section>
    </div>
  );
}

export default App;

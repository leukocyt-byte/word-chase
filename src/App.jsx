import { useState, useEffect } from 'react';
import Synonim from './Synonim';

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
          setWord(result);
          console.log(result);
        })
        .catch((error) => console.log(error));
    }, 700);

    return () => {
      clearTimeout(identifier);
    };
  }, [query]);

  !word && console.log(word);

  const newSynonim = (data) => {
    setQuery(data);
  };

  return (
    <div className="App">
      <div className="search">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg"
          className="image"
          alt="lookup"
        />
        <input
          type="text"
          placeholder="SEARCH"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        ></input>
      </div>

      <div className="data-box">
        {Array.from(word).map((w, index) => {
          return (
            <div key={index}>
              <p className="content-box">
                <b>Phonetic</b>:<span className="tab" />
                {w.phonetic}{' '}
              </p>
              <p>
                <b>Origin:</b>
                <span className="tab" />
                {w.origin}
              </p>
              {Array.from(w.meanings[0].definitions).map((def, index) => {
                return (
                  <div key={index}>
                    <p className="meaning">{def.definition}</p>
                    <div className="button-box" key={index}>
                      {Array.from(
                        w.meanings[0].definitions[`${index}`].synonyms
                      ).map((synonim, index) => {
                        return (
                          <Synonim
                            name={synonim}
                            onChoose={newSynonim}
                            key={index}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

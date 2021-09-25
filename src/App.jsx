import { useState, useEffect } from 'react';
import Synonim from './Synonim';
import Spinner from './components/Spinner';

function App() {
  const [query, setQuery] = useState('');
  const [word, setWord] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const identifier = setTimeout(() => {
      setLoading(true);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        .then((res) => res.json())
        .then((result) => {
          setWord(result);
          setLoading(false);
          //console.log(result);
        })
        .catch((error) => console.log(error));
    }, 700);

    return () => {
      clearTimeout(identifier);
    };
  }, [query]);

  //!word && console.log(word);

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
        ></input>
      </div>
      {loading && <Spinner />}

      <div className="data-box">
        {Array.from(word).title ? (
          <p>No results found. {Array.from(word).title}</p>
        ) : (
          Array.from(word)
            .slice(0, 1)
            .map((w, index) => {
              return (
                <div key={index}>
                  <p className="content-box">
                    <b>Phonetic</b>:<span className="tab" />
                    {w.phonetic}
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
                          ).length > 0 ? (
                            Array.from(
                              w.meanings[0].definitions[`${index}`].synonyms
                            ).map((synonim, index) => {
                              return (
                                <Synonim
                                  name={synonim}
                                  onChoose={newSynonim}
                                  key={index}
                                />
                              );
                            })
                          ) : (
                            <p className="no-synonim">No synonims found.</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default App;

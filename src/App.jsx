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
      fetch(`https://aaaapi.dictionaryapi.dev/api/v2/entries/en/${query}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery('');
          setWord(result);
          console.log(result);
        })
        .catch((error) => console.log(error));
    }, 700);

    setWord([
      {
        word: 'book',
        phonetic: 'bʊk',
        phonetics: [
          {
            text: 'bʊk',
            audio:
              '//ssl.gstatic.com/dictionary/static/sounds/20200429/book--_gb_1.mp3',
          },
        ],
        origin:
          'Old English bōc (originally also ‘a document or charter’), bōcian ‘to grant by charter’, of Germanic origin; related to Dutch boek and German Buch, and probably to beech (on which runes were carved).',
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition:
                  'a written or printed work consisting of pages glued or sewn together along one side and bound in covers.',
                example: 'a book of selected poems',
                synonyms: [
                  'volume',
                  'tome',
                  'work',
                  'printed work',
                  'publication',
                  'title',
                  'opus',
                  'treatise',
                  'novel',
                  'storybook',
                  'manual',
                  'handbook',
                  'guide',
                  'companion',
                  'reference book',
                  'paperback',
                  'hardback',
                  'softback',
                  'yellowback',
                ],
                antonyms: [],
              },
              {
                definition: 'a bound set of blank sheets for writing in.',
                example: 'an accounts book',
                synonyms: [
                  'notepad',
                  'notebook',
                  'pad',
                  'memo pad',
                  'exercise book',
                  'binder',
                  'ledger',
                  'record book',
                  'log',
                  'logbook',
                  'chronicle',
                  'journal',
                  'diary',
                  'daybook',
                  'jotter',
                  'pocketbook',
                  'scratch pad',
                  'cahier',
                ],
                antonyms: [],
              },
              {
                definition:
                  'a set of tickets, stamps, matches, samples of cloth, etc., bound together.',
                example: 'a pattern book',
                synonyms: [],
                antonyms: [],
              },
            ],
          },
          {
            partOfSpeech: 'verb',
            definitions: [
              {
                definition:
                  'reserve (accommodation, a place, etc.); buy (a ticket) in advance.',
                example: 'I have booked a table at the Swan',
                synonyms: [
                  'reserve',
                  'make a reservation for',
                  'arrange in advance',
                  'prearrange',
                  'arrange for',
                  'order',
                  'charter',
                  'hire',
                  'bag',
                  'engage',
                  'bespeak',
                  'arrange',
                  'programme',
                  'schedule',
                  'timetable',
                  'line up',
                  'secure',
                  'fix up',
                  'lay on',
                  'slate',
                ],
                antonyms: [],
              },
              {
                definition:
                  'make an official note of the personal details of (a person who has broken a law or rule).',
                example: 'the cop booked me and took me down to the station',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'leave suddenly.',
                example:
                  'they just ate your pizza and drank your soda and booked',
                synonyms: [],
                antonyms: [],
              },
            ],
          },
        ],
      },
    ]);

    return () => {
      console.log('Cleanup');
      clearTimeout(identifier);
    };
  }, [query]);

  !word && console.log(word);

  const newSynonim = (data) => {
    console.log(data, 'from parent');
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

      <ul>
        {Array.from(word).map((w, index) => {
          return (
            <li key={index}>
              <h3>{w.word}</h3>
              <p>Phonetic: {w.phonetic} </p>
              <p>Origin: {w.origin} </p>
              <br />
              {Array.from(w.meanings[0].definitions).map((def, index) => {
                return (
                  <div key={index}>
                    <p>
                      <b>{def.definition}</b>
                    </p>
                    {Array.from(
                      w.meanings[0].definitions[`${index}`].synonyms
                    ).map((synonim, index) => {
                      return (
                        <Synonim
                          key={index}
                          name={synonim}
                          onChoose={newSynonim}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </li>
          );
        })}{' '}
      </ul>
    </div>
  );
}

export default App;

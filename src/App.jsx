import { useState, useEffect } from 'react';
import Synonim from './Synonim';
import Spinner from './components/Spinner';

function App() {
  const [query, setQuery] = useState('');
  const [word, setWord] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const identifier = setTimeout(() => {
      setLoading(true);
      fetch(`https://aapi.dictionaryapi.dev/api/v2/entries/en/${query}`)
        .then((res) => res.json())
        .then((result) => {
          setWord(result);
          setLoading(false);
        })
        .catch((error) => {
          setHasError(true);
          console.error(error);
          setLoading(false);
        });
    }, 700);

    setWord([
      {
        word: 'bear',
        phonetic: 'bɛː',
        phonetics: [
          {
            text: 'bɛː',
            audio:
              '//ssl.gstatic.com/dictionary/static/sounds/20200429/bear--_gb_1.8.mp3',
          },
        ],
        origin:
          'Old English beran, of Germanic origin; from an Indo-European root shared by Sanskrit bharati, Greek pherein, and Latin ferre .',
        meanings: [
          {
            partOfSpeech: 'verb',
            definitions: [
              {
                definition: 'carry the weight of; support.',
                example:
                  'the bees form large colonies and need the thick branches of tall trees to bear the weight of their nests',
                synonyms: [
                  'support',
                  'carry',
                  'hold up',
                  'prop up',
                  'keep up',
                  'bolster up',
                  'brace',
                  'shore up',
                  'underpin',
                  'buttress',
                  'reinforce',
                ],
                antonyms: [],
              },
              {
                definition: 'endure (an ordeal or difficulty).',
                example: 'she bore the pain stoically',
                synonyms: [
                  'endure',
                  'tolerate',
                  'put up with',
                  'stand',
                  'suffer',
                  'abide',
                  'submit to',
                  'experience',
                  'undergo',
                  'go through',
                  'countenance',
                  'brook',
                  'brave',
                  'weather',
                  'support',
                  'stick',
                  'stomach',
                  'swallow',
                ],
                antonyms: [],
              },
              {
                definition: '(of a person) carry (someone or something).',
                example: 'he was bearing a tray of brimming glasses',
                synonyms: [
                  'carry',
                  'bring',
                  'transport',
                  'move',
                  'convey',
                  'take',
                  'fetch',
                  'haul',
                  'lug',
                  'shift',
                  'deliver',
                  'tote',
                ],
                antonyms: [],
              },
              {
                definition: 'give birth to (a child).',
                example: 'she bore six daughters',
                synonyms: [
                  'give birth to',
                  'bring forth',
                  'deliver',
                  'be delivered of',
                  'have',
                  'mother',
                  'create',
                  'produce',
                  'spawn',
                  'conceive',
                  'breed',
                  'procreate',
                  'reproduce',
                  'birth',
                  'drop',
                  'beget',
                  'engender',
                  'be brought to bed of',
                ],
                antonyms: [],
              },
              {
                definition: 'turn and proceed in a specified direction.',
                example: 'bear left and follow the old drove road',
                synonyms: [
                  'veer',
                  'curve',
                  'swerve',
                  'incline',
                  'turn',
                  'fork',
                  'diverge',
                  'deviate',
                  'bend',
                  'go',
                  'move',
                  'tack',
                  'sheer',
                ],
                antonyms: [],
              },
            ],
          },
        ],
      },
      {
        word: 'bear',
        phonetic: 'bɛː',
        phonetics: [
          {
            text: 'bɛː',
            audio:
              '//ssl.gstatic.com/dictionary/static/sounds/20200429/bear--_gb_1.8.mp3',
          },
        ],
        origin:
          'Old English bera, of West Germanic origin; related to Dutch beer and German Bär .',
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition:
                  'a large, heavy mammal that walks on the soles of its feet, having thick fur and a very short tail. Bears are related to the dog family but most species are omnivorous.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'a large, heavy, cumbersome man.',
                example: 'a lumbering bear of a man',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  'a person who sells shares hoping to buy them back later at a lower price.',
                synonyms: [],
                antonyms: [],
              },
            ],
          },
        ],
      },
    ]);
    return () => {
      clearTimeout(identifier);
    };
  }, [query]);

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
      {hasError && (
        <p className="meaning">
          Something went wrong, check console for error.
        </p>
      )}
      {word.title && <p className="meaning">No definitions found.</p>}

      <div className="data-box">
        {word.slice(0, 1).map((w, index) => {
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
              {w.meanings[0].definitions.map((def, index) => {
                return (
                  <div key={index}>
                    <p className="meaning">{def.definition}</p>
                    <div className="button-box" key={index}>
                      {w.meanings[0].definitions[`${index}`].synonyms.length >
                      0 ? (
                        w.meanings[0].definitions[`${index}`].synonyms.map(
                          (synonim, index) => {
                            return (
                              <Synonim
                                name={synonim}
                                onChoose={newSynonim}
                                key={index}
                              />
                            );
                          }
                        )
                      ) : (
                        <p className="no-synonim">No synonims found.</p>
                      )}
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

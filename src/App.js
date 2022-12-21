import { useState, useEffect } from 'react'
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/Header';
import useAppBadge from './hooks/useAppBadge';



function App() {
  const [wins, setWins] = useState(0); // Win Streak
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null); // First Selection
  const [pickTwo, setPickTwo] = useState(null); // Second Selection
  const [disabled, setDisabled] = useState(false); //Delay Handler
  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  }

  // Start New Game
  const handleNewGame = () => {
    setWins(0);
    clearBadge();
    handleTurn();
    setCards(shuffle);
  };

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;
    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards are the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No Match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }
    return () => {
      clearTimeout(pickTimer);
    };

  }, [cards, pickOne, pickTwo])

  // If player has found all matches, handle accordingly
  useEffect(() => {
    // check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      alert("You Win!");
      setWins(wins + 1);
      handleTurn();
      setBadge();
      setCards(shuffle);
    }
  }, [cards, wins, setBadge])

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
    <div className="grid" >
      {cards.map((card) => {
        const { image, id, matched } = card;

        return (
          <Card
            key={id}
            image={image}
            onClick={() => handleClick(card)}
            selected={card === pickOne || card === pickTwo || matched}
            />
        );
     })}
      </div>
      
      </>
  );
}

export default App;

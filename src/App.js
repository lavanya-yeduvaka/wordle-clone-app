import React, {Component} from 'react'
import Grid from './components/Grid'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wordsList: [
        'apple',
        'grape',
        'mango',
        'peach',
        'lemon',
        'chili',
        'cocoa',
        'melon',
        'zebra',
        'tiger',
      ],
      wordToGuess: '',
      guesses: [],
      attemptsLeft: 6,
      gameStatus: 'ongoing',
      currentGuess: '',
    }
  }

  componentDidMount() {
    this.setRandomWord()
  }

  setRandomWord = () => {
    const randomWord = this.state.wordsList[
      Math.floor(Math.random() * this.state.wordsList.length)
    ]
    this.setState({wordToGuess: randomWord})
  }

  handleInputChange = event => {
    this.setState({currentGuess: event.target.value})
  }

  handleGuess = () => {
    const {wordToGuess, attemptsLeft, currentGuess} = this.state

    if (currentGuess.length === 5 && attemptsLeft > 0) {
      this.setState(prevState => {
        const feedback = this.getFeedback(currentGuess, wordToGuess)
        const newGuesses = [
          ...prevState.guesses,
          {guess: currentGuess, feedback},
        ]
        const newAttemptsLeft = prevState.attemptsLeft - 1

        let gameStatus = prevState.gameStatus
        if (currentGuess === wordToGuess) {
          gameStatus = 'won'
        } else if (newAttemptsLeft === 0) {
          gameStatus = 'lost'
        }

        return {
          guesses: newGuesses,
          attemptsLeft: newAttemptsLeft,
          gameStatus: gameStatus,
          currentGuess: '',
        }
      })
    }
  }

  getFeedback = (guess, target) => {
    const feedback = []
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === target[i]) {
        feedback.push('green') // Correct letter, correct position
      } else if (target.includes(guess[i])) {
        feedback.push('yellow') // Correct letter, wrong position
      } else {
        feedback.push('gray') // Incorrect letter
      }
    }
    return feedback
  }

  resetGame = () => {
    this.setState({
      guesses: [],
      attemptsLeft: 6,
      gameStatus: 'ongoing',
      currentGuess: '',
    })
    this.setRandomWord() // Pick a new word
  }

  render() {
    const {
      guesses,
      attemptsLeft,
      gameStatus,
      currentGuess,
      wordToGuess,
    } = this.state

    return (
      <div className="container">
      <div className="inner-container">
        <h1 className="heading">
          Welcome to <span className="span_head">Wordle Clone Game</span>
        </h1>
        <p className="description">
          The Word Grid Game is a fun and interactive word-guessing game where
          players try to discover the hidden word by entering different letter
          combinations.<br/> The game provides feedback through color-coded tiles,
          helping players refine their guesses with each attempt.
        </p>
        <p className="head">Game Rules</p>
        <div className="all_boxes">
          <p className="box">
            <span className="span_text">Enter a Word: </span> Type a word into
            the grid, one letter per box.
            <br />
            <span className="span_text">Check the Feedback: </span> After
            entering a word, each letter changes color to indicate its accuracy.{' '}
          </p>
          <p className="box">
            <span className="span_text">
              {' '}
              Color Meanings:
              <br />
            </span>
            🟩 Green – The letter is correct and in the right position.
            <br /> 🟨 Yellow – The letter is in the word but in the wrong
            position. <br />⬜ Gray – The letter is not in the word.
          </p>
          <p className="box">
            <span className="span_text"> Make New Guesses:</span> Use the
            feedback to refine your next guess.
          </p>
          <p className="box">
            <span className="span_text">Win the Game:</span> Keep guessing until
            you find the correct word!
          </p>
        </div>

        {gameStatus === 'won' && <p className="success-msg">🎉Congratulations, You won the game.....!</p>}
        {gameStatus === 'lost' && (
          <p className="error-msg">
            You lost the game......! The correct word was:<span className="word-text"> <strong>{wordToGuess}</strong></span>
          </p>
        )}

        <Grid guesses={guesses} />

        {gameStatus === 'ongoing' && (
          <div className="input_field">
            <input
              type="text"
              value={currentGuess}
              onChange={this.handleInputChange}
              maxLength={5}
              placeholder="Enter a 5-letter word"
              className="input-text"
            />
            <button className="button"onClick={this.handleGuess}>Submit</button>
            <p className="attempts-text">Attempts Left : <span className="word-text"> {attemptsLeft}</span></p>
          </div>
        )}
<div className="bottom">
        <button className="button" onClick={this.resetGame}>New Game</button>
        </div>
        </div>
      </div>
    )
  }
}

export default App

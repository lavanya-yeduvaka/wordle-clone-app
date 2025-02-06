import React, {Component} from 'react'
import GuessRow from './GuessRow'

class Grid extends Component {
  render() {
    const {guesses} = this.props

    return (
      <div className="grid">
        {guesses.map((guessData, index) => (
          <GuessRow
            key={index}
            guess={guessData.guess}
            feedback={guessData.feedback}
          />
        ))}
      </div>
    )
  }
}

export default Grid

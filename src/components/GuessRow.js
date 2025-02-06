import React, {Component} from 'react'

class GuessRow extends Component {
  render() {
    const {guess, feedback} = this.props

    return (
      <div className="guess-row">
        {guess.split('').map((letter, index) => (
          <div key={index} className={`letter ${feedback[index]}`}>
            {letter}
          </div>
        ))}
      </div>
    )
  }
}

export default GuessRow

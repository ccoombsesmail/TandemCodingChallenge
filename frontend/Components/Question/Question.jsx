import React from 'react'
import { shuffle } from '../../util/question_gen_util'

const Question = ({ question }) => {
  const answers = question.incorrect
  answers.push(question.correct)
  shuffle(answers)
  return (
    <div>
      <h2>
        {question.question}
      </h2>
      <ul>
        {
          answers.map((answer) => {
            return (
              <li>
                {answer}
              </li>
            )
          })
        }
      </ul>

    </div>
  )
}

export default Question

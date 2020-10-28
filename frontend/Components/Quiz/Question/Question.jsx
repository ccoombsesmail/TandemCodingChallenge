import React from 'react'
import { shuffle } from '../../../util/question_gen_util'
import styles from './Question.module.css'

const Question = ({ question }) => {
  const answers = [...question.incorrect]
  answers.push(question.correct)
  shuffle(answers)
  return (
    <div className={styles.questionWrapper}>
      <h2>
        {question.question}
      </h2>
      <ul>
        {
          answers.map((answer) => {
            return (
              <li className={styles.answer}>
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

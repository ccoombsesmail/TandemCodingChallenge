import React, { useState, useEffect } from 'react'
import 'animate.css/animate.min.css'
import { shuffle } from '../../../util/question_gen_util'
import styles from './Question.module.css'

const Question = ({ question, setAnswer, questionNum, currentAnswers }) => {
  const [choices, setChoices] = useState([])
  useEffect(() => {
    let answers
    if (currentAnswers[questionNum] === null) {
      answers = [...question.incorrect]
      answers.push(question.correct)
      shuffle(answers)
    } else {
      answers = currentAnswers[questionNum][2]  // Get saved answer choices/order from currentAnswers
    }
    setChoices(answers)
  }, [question])

  return (
    <div className={styles.questionWrapper}>
      <h2>
        {question.question}
      </h2>
      <ul>
        {
          choices.map((answer, answerNum) => {
            const liStyles = [styles.answer]
            if (currentAnswers[questionNum] && answer === currentAnswers[questionNum][0]) {
              liStyles.push(styles.selected)
            }
            return (
              <li
                key={answerNum}
                className={liStyles.join(' ')}
                onClick={() => setAnswer(answer, answerNum, choices)}
              >
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

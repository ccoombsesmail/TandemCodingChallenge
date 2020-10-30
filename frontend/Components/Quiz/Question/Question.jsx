import React, { useState, useEffect } from 'react'
import 'animate.css/animate.min.css'
import { Animated } from 'react-animated-css'
import { shuffle } from '../../../util/question_gen_util'
import styles from './Question.module.css'

const Question = ({ question, setAnswer, questionNum, currentAnswers }) => {
  const [choices, setChoices] = useState([])
  useEffect(() => {
    const answers = [...question.incorrect]
    answers.push(question.correct)
    if (currentAnswers[questionNum] === null) {
      shuffle(answers)
    }
    setChoices(answers)
  }, [question])

  const handleAnswerClick = () => {

  }

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
              <li className={liStyles.join(' ')} onClick={() => setAnswer(answer, answerNum)}>
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

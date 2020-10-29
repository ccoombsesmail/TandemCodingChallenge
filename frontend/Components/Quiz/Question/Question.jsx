import React, { useState, useEffect } from 'react'
import 'animate.css/animate.min.css'
import { Animated } from 'react-animated-css'
import { shuffle } from '../../../util/question_gen_util'
import styles from './Question.module.css'

const Question = ({ question, setAnswer, questionNum, currentAnswers }) => {
  const answers = [...question.incorrect]
  answers.push(question.correct)
  useEffect(() => {
    shuffle(answers)
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
          answers.map((answer, answerNum) => {
            const liStyles = [styles.answer]
            if (currentAnswers[questionNum] && answerNum === currentAnswers[questionNum][1]) {
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

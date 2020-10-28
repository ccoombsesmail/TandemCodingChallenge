import React, { useState, useEffect } from 'react'
import Question from './Question/Question'
import { getRandomQuestions } from '../../util/question_gen_util'
import styles from './Quiz.module.css'

const Quiz = () => {

  const [questionNum, setQuestionNum] = useState(-1)
  const [questions, setQuestions] = useState(getRandomQuestions())
  // useEffect(() => {
  //   const questions = getRandomQuestions()
  // }, [])
  return (
    <div className={styles.quizWrapper}>
      <h1>
        Welcome! Click To Begin Your Quiz
      </h1>
      {
      questionNum !== -1 ? (
        <>
          <Question question={questions[questionNum]} />
          <div className={styles.buttonsWrapper}>
            {
              questionNum !== 0 ? (
                <button className={styles.prevButton} type="button" onClick={() => setQuestionNum(questionNum - 1)}> 
                  Previous
                </button>
              ) : null
            }
            {
              questionNum !== questions.length - 1 ? (
                <button className={styles.nextButton} type="button" onClick={() => setQuestionNum(questionNum + 1)}>
                  Next
                </button>
              ) : null
            }
          </div>
        </>
      ) : <button type="button" onClick={() => setQuestionNum(0)}> Begin </button>
      }
    </div>
  )
}
export default Quiz

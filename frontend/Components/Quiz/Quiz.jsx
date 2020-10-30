import React, { useState, useEffect } from 'react'
import 'animate.css/animate.min.css'
import { Animated } from 'react-animated-css'
import Question from './Question/Question'
import { getRandomQuestions, checkAnswers } from '../../util/question_gen_util'
import { createScore } from '../../util/scores_api_util'
import styles from './Quiz.module.css'

const Quiz = ({ currentUser }) => {

  const [questionNum, setQuestionNum] = useState(-1)
  const [questions, setQuestions] = useState(getRandomQuestions())
  const [isVisible, setIsVisibile] = useState(true)
  const [animateOut, setAnimateOut] = useState('slideOutRight')
  const [animateIn, setAnimateIn] = useState('bounceInLeft')
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentAnswers, setCurrentAnswers] = useState(new Array(10).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [numCorrect, setNumCorrect] = useState(0)

  const buttonPress = (direction) => {
    if (direction === 'prev') {
      return () => {
        setAnimateOut('slideOutLeft')
        setAnimateIn('bounceInRight')
        setTimeout(() => {
          setQuestionNum(questionNum - 1)
        }, 1300)
        setIsVisibile(false)
        setTimeout(() => {
          setIsVisibile(true)
        }, 1000)
      }
    }
    return () => {
      setAnimateOut('slideOutRight')
      setAnimateIn('bounceInLeft')
      setTimeout(() => {
        setQuestionNum(questionNum + 1)
      }, 1300)
      setIsVisibile(false)
      setTimeout(() => {
        setIsVisibile(true)
      }, 1000)
    }
  }

  const beginButton = () => {
    setQuestions(getRandomQuestions())
    setCurrentAnswers(new Array(10).fill(null))
    setQuestionNum(0)
    setShowWelcome(false)
  }

  const setAnswer = (selectedAnswer, answerNum) => {
    currentAnswers[questionNum] = [selectedAnswer, answerNum]
    setCurrentAnswers([...currentAnswers])
    console.log([...currentAnswers])
  }

  const handleSubmit = () => {
    const numCorrect = checkAnswers(currentAnswers, questions)
    setQuestionNum(-1)
    setNumCorrect(numCorrect)
    setShowResults(true)
    if (currentUser) {
      createScore({
        username: currentUser.username,
        score: numCorrect,
      }).then((res) => console.log(res))
    } else {
      createScore({
        username: 'Anonymous',
        score: numCorrect,
      }).then((res) => console.log(res))
    }
  }

  return (
    <div className={styles.quizWrapper}>
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={showWelcome}>
        <h1 className={styles.welcome}>
          Welcome! Click To Begin Your Quiz
        </h1>
      </Animated>

      {
        questionNum !== -1 ? (
          <>
            <Animated className={styles.animateWrapper} animationIn={animateIn} animationOut={animateOut} isVisible={isVisible}>
              <Question currentAnswers={currentAnswers} questionNum={questionNum} setAnswer={setAnswer} question={questions[questionNum]} />
            </Animated>
            <div className={styles.buttonsWrapper}>
              {
                questionNum !== 0 ? (
                  <button className={styles.prevButton} type="button" onClick={buttonPress('prev')}>
                    Previous
                  </button>
                ) : null
              }
              {
                questionNum !== questions.length - 1 ? (
                  <button className={styles.nextButton} type="button" onClick={buttonPress('next')}>
                    Next
                  </button>
                ) : null
              }
              {
                questionNum === questions.length - 1 ? (
                  <button className={styles.nextButton} type="button" onClick={handleSubmit} >
                    Submit
                  </button>
                ) : null
              }
            </div>
          </>
        ) : <button className={styles.beginButton} type="button" onClick={() => beginButton()}> Begin New Quiz </button>
    }
      {
          showResults && questionNum === -1 ? (
            <div className={styles.resultsOuterWrapper}>
              <h1>
                Your Score:
                <b>
                  {numCorrect} / 10 
                </b>
              </h1>
              <ul className={styles.resultsWrapper}>
                {
                  questions.map((question, qNum) => {
                    const liStyles = [styles.resultsLi]
                    if (currentAnswers[qNum] && question.correct === currentAnswers[qNum][0]) {
                      liStyles.push(styles.correct)
                    } else {
                      liStyles.push(styles.incorrect)
                    }
                    return (
                      <li className={liStyles.join(' ')}>
                        <span>
                          <b>Correct:</b>
                          {question.correct}
                        </span>
                        <span>
                          <b>Selected:</b>
                          {currentAnswers[qNum] ? currentAnswers[qNum][0] : 'No Answer'}
                        </span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          ) : null
      }
    </div>
  )
}
export default Quiz

import React, { useState, useEffect } from 'react'
import styles from './LeaderBoard.module.css'
import { getScores } from '../../util/scores_api_util'

const LeaderBoard = () => {
  const [topScores, setTopScores] = useState([])

  useEffect(() => {
    getScores().then((res) => {
      setTopScores(res.scores)
    })
  }, [])

  return (
    <div className={styles.leaderBoardWrapper}>
      <ul>
        {
          topScores.map((score, idx) => {
            return (
              <li key={score.id}>
                <span>
                  {`${idx + 1}. ${score.username}`}
                </span>
                <b>
                  {score.score}
                </b>
              </li>
            )
          })
        }
      </ul>
    </div>

  )
}

export default LeaderBoard

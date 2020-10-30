import React, { useState, useEffect } from 'react'
import styles from './LeaderBoard.module.css'
import { getScores } from '../../util/scores_api_util'

const LeaderBoard = ({ score }) => {
  const [topScores, setTopScores] = useState([])

  useEffect(() => {
    getScores().then((res) => {
      setTopScores(res.scores)
    })
  }, [score])

  return (
    <div className={styles.leaderBoardWrapper}>
      <h1>Leader Board</h1>
      <ul>
        {
          topScores.map((scor, idx) => {
            return (
              <li key={scor.id}>
                <span>
                  {`${idx + 1}. ${scor.username}`}
                </span>
                <b>
                  {scor.score}
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

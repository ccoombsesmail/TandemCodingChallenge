export const createScore = (score) => {
  return $.ajax({
    method: 'POST',
    url: 'api/scores',
    data: { score },
  })
}


export const getScores = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/scores',
  })
}
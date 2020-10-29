import questions from '../questions.json'
/*eslint-disable*/

export function getRandomQuestions() {
  let randQuestions = []
  let numQuestions = questions.length
  let qs = [...questions]
  for (let i = 0; i < 10; i++) {
    const randNum = Math.floor(Math.random() * numQuestions)
    randQuestions.push(qs[randNum])
    qs.splice(randNum, 1)
    numQuestions--
  }
  return randQuestions
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


export function checkAnswers(answers, questions) {
  let numCorrect = 0
  for (let i = 0; i <questions.length; i++) {
    if (questions[i].correct === answers[i][0]) {
      numCorrect++
    }
  }
  return numCorrect
}

import { data } from '@/data'

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { question } = req.body

    if (question.startsWith('/questions')) {
      const randomData = getRandomSubset(data, 5)
      let randomQuestions = ''
      randomData.map((data, index) => {
        randomQuestions += `${index + 1}. ${data.question}\n`
      })

      return res.status(200).json({ answer: randomQuestions })
    }

    const answer = findAnswer(question)

    if (answer) {
      return res.status(200).json({ answer })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' })
  }
}

function getRandomSubset(array, count) {
  const shuffled = array.slice() // Create a shallow copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Swap elements
  }
  return shuffled.slice(0, count)
}

function containsGreeting(str) {
  const greetingWords = ['hello', 'hi', 'hey', 'hola', 'greetings']

  for (const greeting of greetingWords) {
    if (str.toLowerCase().includes(greeting)) {
      return true // Found a greeting word
    }
  }

  return false // No greeting word found
}

const findAnswer = question => {
  if (containsGreeting(question)) {
    return 'Hello there good human!'
  }

  let matchedQA = data.find(qa => {
    const questionWithoutSymbols = qa.question.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    return questionWithoutSymbols.includes(question.toLowerCase())
  })

  if (matchedQA) {
    return matchedQA.answer
  } else {
    return "I'm sorry but I don't have answer to your query."
  }
}

export default handler

import { data } from '@/data/conversation'

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { question } = req.body

    const questionWords = question.split(/\s+/)

    let matchedQA = null

    for (const word of questionWords) {
      const wordWithoutSymbols = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')

      let matchFound = false
      for (const entry of data) {
        if (entry.question.toLowerCase().includes(wordWithoutSymbols)) {
          matchedQA = entry
          matchFound = true
          break // Stop searching once a match is found
        }
      }
      if (matchFound) {
        break
      }
    }

    if (matchedQA) {
      res.status(200).json({ answer: matchedQA.answer })
    } else {
      res.status(200).json({ answer: "I'm sorry but I don't have answer to your query." })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' })
  }
}

export default handler

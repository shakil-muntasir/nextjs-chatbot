import { useEffect, useRef, useState } from 'react'

import ChatMessage from '@/components/ChatMessage'

export default function ChatWindow() {
  const containerRef = useRef(null)

  const [userText, setUserText] = useState('')
  const [conversation, setConversation] = useState([
    {
      text: 'Greetings, user!',
      isUser: false
    },
    {
      text: 'Type "/questions" to get list of 5 random questions available',
      isUser: false
    }
  ])

  useEffect(() => {
    // Scroll to the bottom when new text is added
    console.log(containerRef)
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [userText, conversation])

  const handleSendMessage = async e => {
    e.preventDefault()

    try {
      const userMessage = userText
      setUserText('')

      const updatedConversation = [
        ...conversation,
        {
          text: userMessage,
          isUser: true
        }
      ]

      setConversation(updatedConversation)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userMessage })
      })

      const data = await response.json()

      // Update conversation with the API response
      const updatedConversationWithResponse = [
        ...updatedConversation,
        {
          text: data.answer,
          isUser: false
        }
      ]

      setTimeout(() => {
        setConversation(updatedConversationWithResponse)
      }, 500) // manually adding half second delay so it feels like loading...
    } catch (error) {
      console.error('Error fetching answers:', error)
    }
  }

  return (
    <>
      <h1 className='w-full text-center font-semibold text-3xl text-cyan-700 py-2'>ChatBot</h1>

      <div ref={containerRef} className='flex-1 flex flex-col items-center justify-between border-t border-blue-400/25 overflow-hidden overflow-y-auto'>
        <div className='w-full flex-1 py-3 px-3 rounded'>
          <div className='flex flex-col space-y-3'>
            {conversation.map((message, index) => (
              <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'}`}>
                <ChatMessage text={message.text} isUser={message.isUser} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full sm:w-[400px] h-16 p-3 flex flex-col justify-center border-t border-blue-400/25'>
        <form onSubmit={handleSendMessage} className='flex items-center justify-between space-x-3'>
          <input type='text' name='message' id='message' placeholder='Write your message' autoComplete='off' className='py-2 px-3 rounded-md flex-1 focus:ring-1 focus:ring-cyan-700 focus:outline-none' value={userText} onChange={e => setUserText(e.target.value)} />
          <button className='px-4 py-2 bg-cyan-700 rounded-md text-white' type='submit'>
            Send
          </button>
        </form>
      </div>
    </>
  )
}

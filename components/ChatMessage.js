import classNames from 'classnames'

const ChatMessage = ({ text, isUser }) => {
  const messageClass = classNames('px-2 py-1 rounded-md shadow-sm text-right', {
    'bg-white text-gray-900': isUser,
    'bg-blue-400 text-white': !isUser
  })

  return <div className={messageClass}>{text}</div>
}

export default ChatMessage

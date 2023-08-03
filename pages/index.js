import ChatWindow from '@/components/ChatWindow'

export default function Home() {
  return (
    <main className={`flex justify-center bg-blue-400/25 sm:bg-white`}>
      <div className='flex h-screen flex-col items-center justify-center sm:w-[400px] sm:bg-blue-400/25'>
        <ChatWindow />
      </div>
    </main>
  )
}

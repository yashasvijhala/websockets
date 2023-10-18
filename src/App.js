import { useEffect, useState } from 'react'
import './App.css'
const socket = new WebSocket(
  'wss://server.calmbush-e09c8a8d.australiaeast.azurecontainerapps.io/'
)

function App() {
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')

  const joinRoom = () => {
    if (room !== '') {
      socket.send(JSON.stringify({ type: 'join_room', room }))
    }
  }

  const sendMessage = () => {
    socket.send(JSON.stringify({ type: 'send_message', message, room }))
  }

  useEffect(() => {
    socket.onmessage = event => {
      const data = JSON.parse(event.data)
      if (data.type === 'receive_message') {
        setMessageReceived(data.message)
      }
    }
  }, [])

  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={event => {
          setRoom(event.target.value)
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={event => {
          setMessage(event.target.value)
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  )
}

export default App

import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from './Sidebar'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Sidebar/>
    </BrowserRouter>
  )
}

export default App

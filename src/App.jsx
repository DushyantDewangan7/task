import { useState } from 'react'
import MainTable from './components/MainTable'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <MainTable />
      </div>
    </>
  )
}

export default App

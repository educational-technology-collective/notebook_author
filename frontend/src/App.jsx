import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`)
        if (!response.ok) {
          throw new Error('Network response error')
        }
        const result = response.json()
        console.log(result)
        setData(result)
      }
      catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
    Hello world
    </>
  )
}

export default App

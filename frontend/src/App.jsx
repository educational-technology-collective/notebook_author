import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [assignments, setAssignments] = useState([])
  const endpoint = import.meta.env.VITE_API_URL

  const fetchData = async () => {
    console.log('fetching...')
    const response = await axios.get(endpoint)
    console.log(response)
    setAssignments(response.data) 
    return response.data
  }

  const postData = async () => {
    const description = 'test x'
    const metadata_description = '123'
    const stub = ''
    const metadata_stub = ''
    const body = {description, metadata_description, stub, metadata_stub}
    const response = await axios.post(endpoint, body)
    console.log(response)
    return response.data
  }

  const handleSendData = async () => {
    const newData = await postData()
    setAssignments((prev) => [...prev, newData])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <ul>
        {assignments.map(el => <li key={el.id}>{el.description}</li>)}
      </ul>
      <button onClick={handleSendData}>Add Assignment</button>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10


  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then((response) => setData(response.data))
    .catch((error) => alert(`Failed to fetch data: ${error}`))
  },[])

  const totalPages = Math.ceil(data.length / rowsPerPage)
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow)

  const handleNextPage = () => {
    if(currentPage < totalPages){
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if(currentPage > 1){
      setCurrentPage((prev) => prev - 1)
    }
  } 

  return(
    <div className={"container"}>
      <h2>Employee Data Table</h2>
      <table>
        <thead>
          <tr className={"tableHeader"}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((employee) => {
            return(
              <tr>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className={"pagination-controls"}>
        <button onClick={handlePrevPage}>Previous</button>
        <span className={"page-number"}>{currentPage}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}

export default App

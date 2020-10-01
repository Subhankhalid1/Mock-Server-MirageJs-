import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([])
  useEffect(() => {

    setInterval(() => {

      fetch("/api/books")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setBooks(data);

        })

    }, 2000);

  }, [])

  if (!books.length)
    return <h2>Loading..</h2>


  const addBook = () => {
    const title = prompt("Enter Book Title");
    const author = prompt("Enter Book Author");
    const price = prompt("Enter Book Price");
    const releasedDate = prompt("Enter Book Released Date");

    console.log(title, author, price, releasedDate);
    if (!title || !author || !price || !releasedDate)
      return false;

    fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ title, author, price, releasedDate })
    }).
      catch((error) => {

        console.log("Error" + error);

      })
  }


  return (
    <div className="App">
      <h2 >Avaiable Books </h2>
      <table border="6">
        <th>Title</th>
        <th>Author-Name</th>
        <th>Price</th>
        <th>Released-Date</th>
        <tbody>
          {books.map((booksObj, ind) => {
            return (
              <tr key={ind}>
                <td>{booksObj.title}</td>
                <td>{booksObj.author}</td>
                <td>{booksObj.price}</td>
                <td>{booksObj.releasedDate}</td>

              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;

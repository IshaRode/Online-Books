import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searches, setSearches] = useState('');

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((response) => {
        const data = response.data.books;
        setAllBooks(data);
      })
      .catch(() => {
        console.log("Status code: 404");
        console.log("Website not found");
      });
  }, []);

  useEffect(() => {
    const filtered = allBooks.filter((item) =>
      item.title.toLowerCase().includes(searches.toLowerCase())
    );
    setSearchedBooks(filtered);
  }, [searches, allBooks]);

  return (
    <>
      <nav className="flex justify-between p-4">
        <div>Logo</div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searches}
            onChange={(e) => setSearches(e.target.value)}
          />
        </div>
        <div>
          <h2>Register</h2>
        </div>
      </nav>

      <div className='grid-container'>
        {searchedBooks.map((item) => (
          <div key={item.id}>
            <div className="container">
              <div className="image">
                <img className='book-image' src={item.imageLinks.smallThumbnail} alt={item.title} />
                <h3 className='title'>{item.title}</h3>
                <div className="ratings">
                  <p>⭐{item.averageRating ? item.averageRating : '3'} Free</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;

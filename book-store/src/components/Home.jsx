import { useState, useEffect } from 'react';
// Importing axios for fetching API
import axios from 'axios';
import './Home.css';
// For linking of 2 jsx files
import { NavLink } from 'react-router-dom';

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searches, setSearches] = useState('');

  // For data render
  useEffect(() => {
    axios
    // Fetching the API from udacity api
      .get('https://reactnd-books-api.udacity.com/books', {
        headers: { Authorization: 'whatever-you-want' },
      })
      // Show the book data that is rendered
      .then((response) => {
        const data = response.data.books;
        setAllBooks(data);
      })
      // If books not loaded, show error in console
      .catch(() => {
        console.log('Status code: 404');
      });
  }, []);

  // converting whatever typed in the searchbar to lower case 
  useEffect(() => {
    const filtered = allBooks.filter((item) =>
      item.title.toLowerCase().includes(searches.toLowerCase())
    );
    setSearchedBooks(filtered);
  }, [searches, allBooks]);

  return (
    <div className='main'>
      <nav className="navbar">
        <div className="logo">Kalvium Books</div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searches}
            // to track the input value and change the output accordingly
            onChange={(e) => setSearches(e.target.value)}
          />
        </div>
        <div>
          {/* Navigating to the registration page using NavLink */}
          <NavLink to="/Form" className="register-button">
            Register
          </NavLink>
        </div>
      </nav>
      {/* If the API data does not match the input characters, show --> No books found */}
      <div className="grid-container">
        {searchedBooks.length === 0 ? (
          <h1 className='no'>No books found!</h1>
        ) : (
          // To map every object 
          searchedBooks.map((item) => (
            // unique identification of each item
            <div key={item.id}>
              <div className="container">
                <div className="image">
                  <img
                    className="book-image"
                    src={item.imageLinks.smallThumbnail}
                    alt={item.title}
                  />
                  {/* Title of book */}
                  <h3 className="title">{item.title}</h3>
                  <div className="ratings">
                    {/* Rating of the book */}
                    {/* If ratings not available rate it to 3 */}
                    <p className="rate">{item.averageRating ? item.averageRating : '3'}⭐</p>
                    <p className="free">Free</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

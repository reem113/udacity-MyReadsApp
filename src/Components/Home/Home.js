import "../../App.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookShelf from "../BookShelf";
import Navbar from "../Navbar/Navbar";
import OpenSearchBtn from "../OpenSearchBtn/OpenSearchBtn";
import { getAllBooks } from "../../Redux/booksSlice";

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  console.log(books);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={books.filter((book) => book.shelf === "currentlyReading")}
            />
            <BookShelf
              title="Want to Read"
              books={books.filter((book) => book.shelf === "wantToRead")}
            />
            <BookShelf
              title="Read"
              books={books.filter((book) => book.shelf === "read")}
            />
          </div>
        </div>
      </div>
      <OpenSearchBtn />
    </div>
  );
};

export default Home;

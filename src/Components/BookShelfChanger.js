import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import React from "react";
import { updateShelf } from "../Redux/booksSlice";

const BookShelfChanger = (props) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const bookId = props.bookID;
  const bookIndex = books.findIndex((item) => item.id === bookId);

  const handleShelfUpdate = (e) => {
    dispatch(updateShelf({ book: books[bookIndex], shelf: e.target.value }));
  };
  return (
    <div className="book-shelf-changer">
      <select onChange={(e) => handleShelfUpdate(e)}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

BookShelfChanger.propTypes = {
  bookID: PropTypes.any.isRequired,
};

export default BookShelfChanger;

import PropTypes from "prop-types";
import React from "react";
import { updateShelf } from "../Redux/booksSlice";
import { useDispatch } from "react-redux";

const BookShelfChanger = (props) => {
  const dispatch = useDispatch();
  const book = props.bookItem;

  const handleShelfUpdate = (e) => {
    dispatch(updateShelf({ book, shelf: e.target.value }));
  };
  return (
    <div className="book-shelf-changer">
      <select
        onChange={(e) => handleShelfUpdate(e)}
        value={book.shelf ? book.shelf : "none"}
      >
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
  bookItem: PropTypes.object.isRequired,
};

export default BookShelfChanger;

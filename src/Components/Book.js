import "../App.css";

import BookShelfChanger from "./BookShelfChanger";
import PropTypes from "prop-types";
import React from "react";

const Book = (props) => {
  const book = props.selectedbook;

  const bookAuthor = (book) => {
    const author =
      typeof book.authors === "undefined" ? "unkown Author" : book.authors[0];
    return author;
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}
        ></div>
        <BookShelfChanger 
        bookID={book.id}
        bookItem={book} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{bookAuthor(book)}</div>
    </div>
  );
};

Book.propTypes = {
  selectedbook: PropTypes.object.isRequired,
};

export default Book;

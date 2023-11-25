import React from "react";
import { MdDelete } from "react-icons/md";
const Books = ({ book, handleDelete }) => {
  const { title, isbn, pubYear, author } = book;
  return (
    <tr>
      <td>{isbn}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{pubYear}</td>
      <td onClick={() => handleDelete(isbn)}>
        <MdDelete color="red" />
      </td>
    </tr>
  );
};

export default Books;

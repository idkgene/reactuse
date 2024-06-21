import { useArrayFindIndex } from '../useArrayFindIndex';
import * as React from 'react';

const Component = () => {
  const [books, setBooks] = React.useState([
    { title: 'Book A', author: 'Author A' },
    { title: 'Book B', author: 'Author B' },
  ]);

  const findBookByTitle = (book: { title: string }) => book.title === 'Book B';

  const bookIndex = useArrayFindIndex(books, findBookByTitle);

  return (
    <div>
      <p>Book Index: {bookIndex}</p>
    </div>
  );
};

export default Component;

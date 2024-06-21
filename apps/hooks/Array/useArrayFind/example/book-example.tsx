import { useArrayFind } from '../useArrayFind';
import * as React from 'react';

const Component = () => {
  const [books, setBooks] = React.useState([
    { title: 'Book A', author: 'Author A' },
    { title: 'Book B', author: 'Author B' },
    { title: 'Book C', author: 'Author A' },
  ]);

  const findBookByTitle = (book: { title: string }) => book.title === 'Book B';

  const book = useArrayFind(books, findBookByTitle);

  return (
    <div>
      <p>Book: {book ? book.title : 'None'}</p>
    </div>
  );
};

export default Component;

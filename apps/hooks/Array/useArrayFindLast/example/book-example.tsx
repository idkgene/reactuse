import { useArrayFindLast } from '../useArrayFindLast';
import * as React from 'react';

const Component = () => {
  const [books, setBooks] = React.useState([
    { title: 'Book A', author: 'Author A' },
    { title: 'Book B', author: 'Author B' },
    { title: 'Book C', author: 'Author A' },
  ]);

  const findLastBookByAuthor = (book: { author: string }) =>
    book.author === 'Author A';

  const lastBook = useArrayFindLast(books, findLastBookByAuthor);

  return (
    <div>
      <p>Last Book: {lastBook ? lastBook.title : 'None'}</p>
    </div>
  );
};

export default Component;

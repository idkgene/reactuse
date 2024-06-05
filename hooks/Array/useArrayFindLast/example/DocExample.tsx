import { useArrayFindLast } from '../useArrayFindLast';

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true },
];

function ExampleDemo() {
  const lastActiveUser = useArrayFindLast(users, user => user.active);

  return (
    <div>
      <p>Original array: {JSON.stringify(users)}</p>
      <p>Last active user: {JSON.stringify(lastActiveUser)}</p>
    </div>
  );
}

export default ExampleDemo;

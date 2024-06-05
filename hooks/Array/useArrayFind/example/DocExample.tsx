import { useArrayFind } from '../useArrayFind';

const users = [
  { id: 1, name: 'John', active: false },
  { id: 1, name: 'Jane', active: true },
  { id: 1, name: 'Bob', active: false },
];

function ExampleDemo() {
  const firstActiveUser = useArrayFind(users, user => user.active);

  return (
    <>
      <div>
        <p>Original array: {JSON.stringify(users)}</p>
        <p>First active user: {JSON.stringify(firstActiveUser)}</p>
      </div>
    </>
  );
}

export default ExampleDemo;

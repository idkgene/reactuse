import { useArrayFindIndex } from '@/hooks/Array/useArrayFindIndex';

const ExampleDemo = () => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  const findUserIndexByName = (user: { name: string }) => user.name === 'Bob';
  const userIndex = useArrayFindIndex(users, findUserIndexByName);

  return (
    <>
      <div>User index: {userIndex}</div>
    </>
  );
};

export default ExampleDemo;

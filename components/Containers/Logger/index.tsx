import { useLogger } from "@/hooks/useLogger";

const MyComponent = ({ prop1, prop2 }) => {
  useLogger("MyComponent", prop1, prop2);

  // Component logic
  return (
    <div>
      <h1>My Component</h1>
      <p>Prop1: {prop1}</p>
      <p>Prop2: {prop2}</p>
    </div>
  );
};

export default MyComponent;

import { useState } from 'react';

interface IApp {
  name?: string;
}

function App({ name }: IApp) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1>
        Hello {name ? name : "world"}, você clicou {count} vezes
      </h1>
      <button onClick={handleClick}>
        Clique em mim {name && name}
      </button>
    </>
  );
}

export default App;

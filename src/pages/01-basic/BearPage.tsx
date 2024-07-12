import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <BlackBears />
        <PolarBears />
        <PandaBears />

        <BearsDisplay />
      </div>
    </>
  );
};

const BlackBears = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}>+1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

const PolarBears = () => {
  const polarBears = useBearStore((state) => state.polarBears);
  const increasePolarBears = useBearStore((state) => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(+1)}> +1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {polarBears} </span>
        <button onClick={() => increasePolarBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

const PandaBears = () => {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const increasePandaBears = useBearStore((state) => state.increasePandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(+1)}> +1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increasePandaBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  // const bears = useBearStore((state) => state.bears); // <-- Sin usar useShallow (se renderizar todo el componente)
  const bears = useBearStore(useShallow((state) => state.bears)); // <-- Usar useShallow (si el estado no cambia, no se renderizará el componente)
  const doNothing = useBearStore((state) => state.doNothing);

  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h1>Osos</h1>

      <div className="flex flex-col gap-2">
        <button onClick={doNothing}>Do Nothing</button>
        <button onClick={addBear}>Add Bear</button>
        <button onClick={clearBears}>Clear Bears</button>
      </div>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};

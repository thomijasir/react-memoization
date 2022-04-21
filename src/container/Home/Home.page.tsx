import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { AppContext } from '../../store/AppProvider';
import './Home.scss';
// https://www.youtube.com/watch?v=DEPwA3mv_R8
export interface IProps {}

const ColorBox: FC<{ color: string; onClick: () => void }> = (props) => {
  const { color, onClick } = props;
  const context = useContext(AppContext);
  console.log('Render Box Element: ', props);
  const handleChildClick = () => {
    onClick && onClick();
  };
  const handleSetLoadingChild = () => {
    context.setLoading({ isLoading: true });
    setTimeout(() => {
      context.setLoading({ isLoading: false });
    }, 1000);
  };
  return (
    <div className="container">
      <div
        style={{
          marginTop: '16px',
          width: '100%',
          height: '200px',
          backgroundColor: color,
        }}
      ></div>
      <button type="button" onClick={handleChildClick}>
        Change Color Black
      </button>
      <button type="button" onClick={handleSetLoadingChild}>
        Set Loading Child
      </button>
    </div>
  );
};

const MemoizationColorBox = React.memo(ColorBox);

const Home = () => {
  const [counter, setCounter] = useState<number>(0);
  const [color, setColor] = useState<string>('red');
  const context = useContext(AppContext);

  console.log('APP Render: ', counter);

  const colorBoxProps = {
    color,
    onClick: () => {
      setCounter(counter + 1);
      console.log('EXCUTE TERUS: ', counter);
    },
  };
  const handleOnClick = useCallback(() => {
    console.log('JUGROG');
  }, []);
  const colorBoxPropsMemoize = useMemo(
    () => ({
      color,
      onClick: handleOnClick,
    }),
    [color, counter],
  );

  const handleSetLoading = () => {
    context.setLoading({ isLoading: true });
    setTimeout(() => {
      context.setLoading({ isLoading: false });
    }, 1000);
  };
  return (
    <div className="home-page safe-area">
      <div className="home-content">
        <h1>Memoization Playground</h1>
        <p>Counter: {counter}</p>
        <button type="button" onClick={() => setCounter(counter + 1)}>
          Render Application
        </button>
        <button type="button" onClick={() => setColor('blue')}>
          Change Color Parents
        </button>
        <button type="button" onClick={handleSetLoading}>
          SetLoading
        </button>
        {/* Sample Direct Use Memo in Element
        {useMemo(
          () => (
            <ColorBox {...colorBoxProps} />
          ),
          [color],
        )} */}
        <MemoizationColorBox {...colorBoxPropsMemoize} />
      </div>
    </div>
  );
};

export default Home;

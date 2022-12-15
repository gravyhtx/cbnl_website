import { useState, useEffect, ReactNode, FC } from 'react';

{/* HOW TO USE //*/}

{/*
  const c1 = <h1>Hi</h1>;
  const c2 = <h1>MOM!</h1>;

  <LoadComponents preLoadComponent={c1} loadedComponent={c2} />

  Expected Output (Pre-Load):  Hi
  Expected Output (Pre-Load):  MOM!

*/}
interface Props {
  components: {
    a: ReactNode,
    b: ReactNode,
  };
  classes?: {
    a: string | undefined,
    b: string | undefined,
  };
  interval?: number | undefined;
}

const LoadComponents: FC<Props> = ({ components, interval, classes }): JSX.Element => {

  // Set active 'component' to the 'preLoadComponent' before state updates. Sets an empty Fragment as default.
  const a = components.a || <></>;
  const b = components.b || <></>;
  const [component, setComponent] = useState(a);

  // Set defaults
  classes.a = classes.a ? ' '+classes.a : '';
  classes.b = classes.b ? ' '+classes.b : '';

  useEffect(() => {
    // Update  'component' to the 'loadedComponent' when state updates.
    const updateComponent = async () => {
      try {
        // Set timeout delay if parameters are entered (correctly).
        if (typeof interval === 'number' && interval !== 0) {
          setTimeout(() => {setComponent(b)}, interval);
        } else if (interval === undefined || interval === 0) {
          setComponent(b);
        } else if (interval && interval !== "number") {
          console.error('Parameter "interval" must be a number or left blank.');
        } else {
          console.error('Yo. Check ur code, homie.');
        }
      } catch (err) {
        console.error(err);
      }
    };

    updateComponent();

  },[]);

  return (<>
    {classes ?
      <div className={component === a ? 'preload-component'+classes.a : classes.b}>
        {component}
      </div>
      : component}
  </>)
}

export default LoadComponents;
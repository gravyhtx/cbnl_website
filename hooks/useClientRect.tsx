import { element } from 'prop-types';
import { useState, useCallback, ReactNode, RefObject, ReactElement, createRef } from 'react';

export function useClientRect(
  property?: 'height' | 'width' | 'top' | 'bottom' | 'left' | 'right' | 'x' | 'y' | undefined,
  elementRef?: RefObject<HTMLElement>,
) {
  if(elementRef) {
    return elementRef.current.getBoundingClientRect();
  }
  const [rect, setRect] = useState(null);
  const ref = useCallback((node: Element | null) => {
    if (node !== null && rect === null && property !== undefined) {
      setRect(node.getBoundingClientRect()[property]);
    }
    if (node !== null && rect === null && property === undefined) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

// const MyComponent = () => {
//   const [node, setNode] = useState<Element | null>(null);
//   const [rect, ref] = useClientRect();

//   useEffect(() => {
//     ref(node);
//   }, [node]);

//   return (
//     // ...
//   );
// }

export const elIsInView = (
  elementRef: Element,
) => {

  const rect = elementRef.getBoundingClientRect();

  if (rect.top >= 0 &&
  rect.left >= 0 &&
  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
    return true;
  }
}
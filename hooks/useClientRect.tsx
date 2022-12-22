import { element } from 'prop-types';
import { useState, useCallback, RefObject, useEffect } from 'react';

export function useClientRect(
  property?: 'height' | 'width' | 'top' | 'bottom' | 'left' | 'right' | 'x' | 'y' | 'all' | undefined,
  elementRef?: RefObject<HTMLElement>,
) {
  if(elementRef && elementRef.current !== null) {
    return elementRef.current.getBoundingClientRect();
  }
  const [rect, setRect] = useState(null);
  const ref = useCallback((node: Element | null) => {
    if (node !== null && rect === null && (property !== undefined || 'all')) {
      setRect(node.getBoundingClientRect()[property]);
    }
    else if (node !== null && rect === null && (property === undefined || 'all')) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref] as const;
}

export const elementIsVisible = (
  elementRef: RefObject<HTMLElement>,
) => {
  
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const refresh = () => {
      const rect = elementRef.current.getBoundingClientRect();
      if (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= document.body.clientHeight &&
        rect.right <= document.body.clientWidth) {
        setIsVisible(true);
      }
      else {
        setIsVisible(false);
      }
    }
    if(elementRef.current !== null) {
      refresh();
      if(document) {
        document.body.addEventListener("scroll", refresh);
        return () => document.body.removeEventListener('scroll', refresh);
      }
    }
  })

  return isVisible;
  
}
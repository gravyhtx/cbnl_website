import { useState, useCallback, RefObject, useEffect } from 'react';

export function useClientRect(
  elementRef?: RefObject<HTMLElement>,
  property?: 'height' | 'width' | 'top' | 'bottom' | 'left' | 'right' | 'x' | 'y' | 'all' | undefined,
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

export function useRect(): [
  DOMRect | undefined,
  (node: HTMLElement | null) => void
] {
  const [rect, setRect] = useState<DOMRect | undefined>(undefined);
  const ref = useCallback((node: HTMLElement | null): void => {
    if (node) setRect(node.getBoundingClientRect());
  }, []);
  return [rect, ref];
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
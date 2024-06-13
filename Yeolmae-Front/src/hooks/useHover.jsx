import { useState, useRef, useEffect } from 'react';

function useHover() {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    const element = ref.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return [ref, hover];
}

export default useHover;

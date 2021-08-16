import { useState, useMemo } from 'react';

const useHover = () => {

  const [hovered, setHovered] = useState();

  const eventHandlers = useMemo(() => ({
    onMouseOver() { setHovered(true); },
    onMouseOut() { setHovered(false); }
  }), []);
  
  return [hovered, eventHandlers];
}

export default useHover;

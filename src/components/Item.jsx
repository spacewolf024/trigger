import React from 'react';
import useHover from '../hooks/useHover';
import Flyout from './Flyout';

const Item = (props) => {
    const [hovered, eventHandlers] = useHover();
    return (
        <li 
          {...eventHandlers} 
          className={hovered ? 'active' : 'inactive' }
        >
            {props.value}
            {
                props.showFlyout && <Flyout isHovered={hovered} />
            }
        </li>
    )
  };

  export default Item;
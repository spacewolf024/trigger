import React from 'react';

export const Button = (props) => {
    const handleClick = () => {
      console.log("click");
    };
    const inner = props.children || props.text;
    
    return (
        <button
          {...props}
          id={props.id}
          disabled={props.disabled}
          type="submit"
          onClick={handleClick}
        >
          {inner}
        </button>
      );
  }
  
  export const AnchorLink = (props) => {
    const inner = props.children || props.text;
    return (
      <a
        id={props.id}
        href={props.href}
        rel={props.rel}
        target={props.target}
      >
        {inner}
      </a>
    );
  };
  
  export const Flyout = (props) => {
    const {cssClass, children, ...otherProps} = props;
    return <div {...otherProps} className={cssClass}>{children}</div>;
  };
  
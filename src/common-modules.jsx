
import React from 'react';

import { Image, Button, AnchorLink } from "./core-modules.js";

export const ImageButton = (props) => {
  <Button id={props.buttonId} className="test-class">
    <Image id={props.imageId} {...props} className="test-class-2" />
  </Button>;
};


export const ImageLink = (props) => {
      <AnchorLink href="#">
        <Image {...props} />
      </AnchorLink>
};

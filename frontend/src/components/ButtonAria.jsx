import React, { useRef } from "react";
import { Button } from "react-bootstrap"
import { useButton } from '@react-aria/button'

function ButtonConida (props) {
  let { children } = props;
  let ref = useRef();
  let { buttonProps, isPressed } = useButton(
    {
      ...props
    },
    ref
  );
  return (
    <Button  {...buttonProps} ref={ref}>
      {children}
    </Button>
  );
}

export default ButtonConida;
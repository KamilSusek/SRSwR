import React from 'react';
import { Label, Input, FormFeedback } from 'reactstrap';

const UIInpunt = props => (
  <Label className="w-100">
    {props.label}
    <Input {...props} />
    <FormFeedback>{props.error ?? ''}</FormFeedback>
  </Label>
);

export default UIInpunt;

import React from 'react';
import Input from '../Input';

const Autocomplete = () => (
  <Input
    placeholder="Pick-up Location"
    onChange={(val) => console.log({ val })}
  />
);

export default Autocomplete;

import React from 'react';

import Autocomplete from './components/Autocomplete';

const App = () => (
  <div>
    <Autocomplete onChange={(value) => console.log({ value })} />
  </div>
);

export default App;

import React from 'react';

import AppContent from './stack';
import { ThemeProvider } from './theme';

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;

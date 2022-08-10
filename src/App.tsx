import React from 'react';
import './i18n.config';

import AppContent from './stack';
import { ThemeProvider } from './theme';

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;

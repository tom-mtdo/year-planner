import React from 'react';
import './App.css';
import { AppBox } from './App.style';
import Header from './comp/1-header/Header';
import Footer from './comp/3-footer/Footer';
import Body from './comp/2-body/Body';

function App() {
  return (
    <AppBox>
      <Header />
      <Body />
      <Footer />
    </AppBox>
  );
}

export default App;

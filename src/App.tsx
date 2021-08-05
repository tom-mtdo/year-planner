import React from 'react';
import './App.css';
import { AppBox } from './App.style';
import Header from './comp/header/Header';
import Footer from './comp/footer/Footer';
import Body from './comp/body/Body';

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

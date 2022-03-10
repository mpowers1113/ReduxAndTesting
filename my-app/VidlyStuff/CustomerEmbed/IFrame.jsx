import React, { useEffect } from 'react';
import Frame from 'react-frame-component';
import CustomerEmbed from './CustomerEmbed';
import { ReactDOM } from 'react';

import { useRef } from 'react';
import { isMobile } from 'react-device-detect';

const stylesImported = (
  <style type="text/css">
    {`

@font-face {
  font-family: Inter;
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
    font-family: Trap;
    src: url("fonts/Trap-Regular.otf") format("opentype");
}
@font-face {
    font-family: Trap;
    src: url("fonts/Trap-Bold.otf") format("opentype");
    font-weight: bold;
}
@font-face {
    font-family: Corbert;
    src: url("fonts/The Northern Block - Corbert Regular Wide.otf") format("opentype");
}

@font-face {
    font-family: Roboto;
    src: url("fonts/Roboto-Regular.ttf") format("truetype");
}
@font-face {
    font-family: Roboto;
    src: url("fonts/Roboto-Bold.ttf") format("truetype");
    font-weight: bold;
}
@font-face {
    font-family: Roboto;
    src: url("fonts/Roboto-Light.ttf") format("truetype");
    font-weight: light;
}

.split-button-color-beacon {
  background-color: #f50163;
  color: white;
  width: 100%;
  min-height: 3rem;
  max-height: 3rem;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  font-family: Roboto;
  transition: background-color 0.5s ease;
}

.button-color-beacon {
  background-color: #f50163;
  color: white;
  width: 100%;
  min-height: 3.5rem;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  font-family: Roboto;
  transition: background-color 0.5s ease;
}

.split-button-beacon-wrapper {
  margin: .75rem .25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-beacon-wrapper {
  margin: 1.3rem .25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.split-button-color-beacon:hover {
  background-color: #4227bf;

}
.button-color-beacon:hover{
  background-color: #4227bf;
}

.price-box {
  background-color: white;
  width: 100px;
  height: auto;
  flex-direction: column;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem .3rem;
  border: 2px solid black;
  border-radius: .5rem;
  cursor: pointer;
  transition: background-color 0.5s ease;
  margin: .3rem;
}

.split-packages-price-box {
  background-color: white;
  width: 80px;
  height: auto;
  flex-direction: column;
  color: black;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: .4rem .2rem;
  border: 2px solid black;
  border-radius: .5rem;
  cursor: pointer;
  transition: background-color 0.5s ease;
  margin: .2rem;
}

.price-box:hover {
    background-color: black;
    color: white;
}

.split-packages-price-box:hover {
  background-color: black;
  color: white;
}

.price-box-selected {
  background-color: black;
  color:white;
}

.price-box-minutes {
  margin: 0;
  padding: 0;
  font-weight: 900;
  font-size: 1.3rem;
  font-family: Roboto;
}

.price-box-selected {
    background-color: black;
    color: white;     
}

.split-max-width-beacon {
  min-width: 375px;
  max-width: 400px;
  diplay:flex;
  justify-content: center;
  align-items: center;            
  height: 375px;
  background-color: white;
  border-radius: 2rem;
  
}
.desktop-container {
  width: 600px;
  display: flex;
  height: 375px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 2rem;
}
.max-width-beacon {
  min-width: 375px;
  max-width: 400px;
  diplay:flex;
  justify-content: center;
  align-items: center;            
  height: 333px;
  background-color: white;
  border-radius: 2rem;
  
}
.container-beacon {
  min-width: 375px;
  margin: 0 auto;
  background-color: #fffff;
  width: 100%;
  max-width: 600px;
  height: 310px;
  border-radius: 28px;
  transition: all .4 ease;   
}
.sub-container-beacon {
  margin-bottom: 1rem;
}
.header-beacon {
  display: flex;
  align-items: center;
  justify-content: start;
}
.header-full-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
}
.header-full-name h3 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-family: Roboto;
}
.header-full-name h5 {
  margin: 0;
  padding: 0;
  font-family: Inter;
}

.packages-wrapper {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.split-packages-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.footer-beacon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.signup-link {
  font-family: Roboto;
}
`}
  </style>
);

var styles = {
  border: '1px solid',
  width: '100%',
  height: '100%',
};

const deskTopStyle = {
  border: '1px solid',
  width: '600px',
  height: '375px',
};
const mobileStyle = { border: '1px solid', width: '600px', height: '375px' };

const frameStyles = isMobile ? mobileStyle : deskTopStyle;

const Content = ({ children }) => <section>{children}</section>;

const IFrame = () => {
  return (
    <Frame
      style={frameStyles}
      initialContent='<!DOCTYPE html><html><head><link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"></head><body><div id="mountHere"></div></body></html>'>
      <Content>
        <CustomerEmbed />
      </Content>
    </Frame>
  );
};

export default IFrame;

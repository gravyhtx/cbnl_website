import React, { useState } from 'react';

import { Poppins, JetBrains_Mono } from '@next/font/google';

import '../styles/materialize.css';
import '../styles/animate.css';
import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/glider.css';

const poppins = Poppins({
  weight:['100','200','300','400','500','600','700','800',] 
});

const code = JetBrains_Mono({
  weight:['100','200','300','400','500','600','700','800',]
})


function App({ Component, pageProps }) {
  return (
  <React.StrictMode>
    <style jsx global>{`
      body {
        font-family: ${poppins.style.fontFamily}, Helvetica Neue, Helvetica, Arial, sans-serif;
      }
      code {
        font-family: ${code.style.fontFamily}, Courier New, Courier, monospace;
    `}</style>
    <Component {...pageProps} />
  </React.StrictMode>
  )
}

export default App;
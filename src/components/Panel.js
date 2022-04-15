import { useState, useEffect } from 'react';
import Canvas from './Canvas';

function Panel ({ selectColor, pixels, handlePainting }) {
   const setArt = () => {
      console.log('fix this');
   }

   return (
      <div className="panel">
         <Canvas data={pixels} setData={handlePainting} selectColor={selectColor} />
      </div>
   )
}

export default Panel;

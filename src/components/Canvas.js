import { useRef, useEffect, useState } from 'react';

function Canvas ({ data, selectColor, setData }) {
   const canvasRef = useRef(null);
   const hoverRef = useRef(null);
   const [cameraZoom, setCameraZoom] = useState(0.8);
   const [cameraOffset, setCameraOffset] = useState({ x: window.innerWidth/2, y: window.innerHeight/2 });
   const [isDragging, setDragging] = useState(false);
   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
   const [selectPixel, setSelectPixel] = useState(null);

   let SCROLL_SENSITIVITY = 0.001;
   let MAX_ZOOM = 20;
   let MIN_ZOOM = 0.8;
   let pixelSize = { x: 10, y: 10 };

   const draw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.translate( window.innerWidth / 2, window.innerHeight / 2 );
      ctx.scale(cameraZoom, cameraZoom);
      ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
      ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
      var rowCount = 0;
      for (let r=-data.length*pixelSize.x/2; r<data.length*pixelSize.x/2; r+=pixelSize.x) {
         var columnCount = 0;
         for (let c=-data[0].length*pixelSize.y/2; c<data.length*pixelSize.y/2; c+=pixelSize.y) {
            ctx.fillStyle = data[rowCount][columnCount];
            ctx.fillRect(c,r,pixelSize.x,pixelSize.y);
            columnCount+=1;
         }
         rowCount+=1;
      }
   }

   const drawHover = () => {
      const canvas = hoverRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.translate( window.innerWidth / 2, window.innerHeight / 2 );
      ctx.scale(cameraZoom, cameraZoom);
      ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
      ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
      var rowCount = 0;
      for (let r=-data.length*pixelSize.x/2; r<data.length*pixelSize.x/2; r+=pixelSize.x) {
         var columnCount = 0;
         for (let c=-data[0].length*pixelSize.y/2; c<data.length*pixelSize.y/2; c+=pixelSize.y) {
            ctx.beginPath();
            ctx.rect(c+0.1,r+0.1,pixelSize.x,pixelSize.y);
            if (ctx.isPointInPath(mousePos.x, mousePos.y)) {
               ctx.fillStyle = selectColor;
               if (ctx.isPointInPath(mousePos.x, mousePos.y)) {
                  setSelectPixel({ x: rowCount, y: columnCount });
                  // triggle paint
               }
               ctx.fill();
            }
            columnCount+=1;
         }
         rowCount+=1;
      }
   }

   const getEventPos = (e) => {
      if (e.touches && e.touches.length === 1) {
         return { x:e.touches[0].clientX, y: e.touches[0].clientY }
      }
      else if (e.clientX && e.clientY) {
         return { x: e.clientX, y: e.clientY }        
      }
   }

   const handleMouseDown = (e) => {
      setDragging(true);
      setDragStart({
         x: getEventPos(e).x/cameraZoom - cameraOffset.x,
         y: getEventPos(e).y/cameraZoom - cameraOffset.y,
      });
   }

   const handleMouseUP = (e) => {
      setDragging(false);
   }

   const handleMouseMove = (e) => {
      let newOffsetX = getEventPos(e).x/cameraZoom - dragStart.x;
      let newOffsetY = getEventPos(e).y/cameraZoom - dragStart.y;
      if (isDragging) {
         setCameraOffset({
            x: newOffsetX,
            y: newOffsetY,
         });
      }
      setMousePos({ x: e.clientX, y: e.clientY });
   }

   const handleWheel = (e) => {
      var newZoom = cameraZoom+e.deltaY*SCROLL_SENSITIVITY; 
      if (newZoom > MAX_ZOOM) {
         setCameraZoom(MAX_ZOOM);
      }
      else if (newZoom < MIN_ZOOM) {
         setCameraZoom(MIN_ZOOM);
      }
      else {
         setCameraZoom(newZoom);
      }
   }

   const handleClick = (e) => {
      switch (e.detail) {
         case 1:
            break;
         case 2:
            console.log(selectPixel.x, selectPixel.y);
            setData(selectPixel.x, selectPixel.y);
            break;
         default:
            return;
      }
   };

   const handleContextMenu = (e) => {
      e.preventDefault();
   }

   useEffect(() => {
      document.addEventListener("contextmenu", handleContextMenu);
   }, [])

   // Update Hover Canvas
   useEffect(() => {
      drawHover();
   }, [mousePos, cameraZoom, cameraOffset]);

   // Update Art
   useEffect(() => {
      draw();
   }, [cameraZoom, cameraOffset, data]);

   return (
      <>
         <canvas ref={hoverRef} className="top-canvas" onClick={handleClick} onWheel={handleWheel} onMouseUp={handleMouseUP} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseOver={handleMouseUP} />
         <canvas ref={canvasRef} className="art" />
      </>
   )
}

export default Canvas;

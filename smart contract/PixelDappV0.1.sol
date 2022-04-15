// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract PixelDapp {
   bytes3[50][50] public pixels;

   event UpdatePixels(
         uint x,
         uint y,
         bytes3 color
         );

   function getRow (uint x) external view returns(bytes3[50] memory) {
      return pixels[x];
   }

   function colorPixel(uint x, uint y, bytes3 color) external {
      pixels[x][y] = color;
      emit UpdatePixels(x, y, color);
   }
}

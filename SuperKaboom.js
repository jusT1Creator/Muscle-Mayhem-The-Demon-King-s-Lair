 // import kaboom lib
 import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    
 function loadBackground(backgroundName){
    add([
        sprite(backgroundName),
        scale(width()/250, height()/160)
    ]);
 }
 // initialize kaboom context
 kaboom();

 loadSprite("grass", "assets/Grass.png");

 
 
 // add a piece of text at position (120, 80)
 scene("game", ()=>{
   loadBackground("grass");
 });

 go("game");
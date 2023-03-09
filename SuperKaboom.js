 // import kaboom lib
 import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    
 // initialize kaboom context
 kaboom();

 loadSprite("grass", "assets/Grass.png",{
    width: 300,
    height: 300
 });
 
 // add a piece of text at position (120, 80)
 scene("game", ()=>{
    add([
        sprite("grass"),
        scale(width()/120, height()/80)
    ]);
    
 });

 go("game");
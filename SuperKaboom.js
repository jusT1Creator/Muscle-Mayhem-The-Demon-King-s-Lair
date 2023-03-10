import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    
 function loadBackground(backgroundName){
    add([
        sprite(backgroundName),
        scale(width()/220, height()/220)
    ]);
 }
 kaboom();

 loadSprite("grass", "assets/Grass.png");

 scene("game", ()=>{
   loadBackground("grass");
 });

 go("game");
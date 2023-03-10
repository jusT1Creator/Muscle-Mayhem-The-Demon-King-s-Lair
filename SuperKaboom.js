import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    
 function loadBackground(backgroundName){
    add([
        sprite(backgroundName),
        scale(width()/220, height()/220)
    ]);
 }
 kaboom();

 document.body.style.overflow = 'hidden';

 loadSprite("grass", "assets/Grass.png");

loadSprite("obunga", "assets/OIP.png")

scene("game", ()=>{
   loadBackground("grass"),
add([
    sprite("obunga")
    ])
});


go("game");
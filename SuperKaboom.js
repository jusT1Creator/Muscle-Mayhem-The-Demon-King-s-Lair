import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    



kaboom();


 function loadBackground(backgroundName){
    add([
        sprite(backgroundName),
        scale(width()/220, height()/220)
    ]);
 }

 function instantiatePlayer(){
  add([
    z(5),
    sprite("player"),
    pos(100, 200),
    health(8),
    move(0, 0 ),
    // Plain strings are tags, a quicker way to let us define behaviors for a group
    "player",
    "friendly",
    // Components are just plain objects, you can pass an object literal as a component.
    {
        dead: false,
        
    },
  ]);
 }


 document.body.style.overflow = 'hidden';

loadSprite("grass", "assets/Grass.png");

loadSprite("obunga", "assets/OIP.png");

loadSprite("player", "assets/Ball.png");

let player;

onKeyDown("w", ()=> {
  player.move(0, 1);
 }
);

scene("game", ()=>{
   loadBackground("grass"),
add([
    sprite("obunga")
    ])
player = instantiatePlayer();
});



go("game");



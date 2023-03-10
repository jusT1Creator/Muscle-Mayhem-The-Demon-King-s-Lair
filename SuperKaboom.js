import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    
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
    area(),
    body(),
    health(8),
    doubleJump(),
    move(),
    // Plain strings are tags, a quicker way to let us define behaviors for a group
    "player",
    "friendly",
    // Components are just plain objects, you can pass an object literal as a component.
    {
        dir: LEFT,
        dead: false,
        speed: 240,
    },
  ]);
 }
 kaboom();

 document.body.style.overflow = 'hidden';

loadSprite("grass", "assets/Grass.png");

loadSprite("obunga", "assets/OIP.png");

loadSprite("player", "assets/Ball.png");

let player = null;

scene("game", ()=>{
   loadBackground("grass"),
add([
    sprite("obunga")
    ])
player = instantiatePlayer();
});


go("game");

onKeyDown("w", ()=> {
  player.move(0, 100)
})
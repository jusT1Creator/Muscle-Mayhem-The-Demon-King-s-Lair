import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    



kaboom();


 function loadBackground(backgroundName){
    add([
        sprite(backgroundName),
        scale(width()/220, height()/220)
    ]);
 }

 


document.body.style.overflow = 'hidden';

loadSprite("grass", "assets/Grass.png");

loadSprite("obunga", "assets/OIP.png");

loadSprite("player", "assets/Ball.png");

loadSprite("Bruce_Wang", "assets/Bruce_wang_idle.png",{
  sliceX:4,
  sliceY:1,
  anims:{
    idle:{
      from: 0,
      to: 3,
      loop : true,
    },
  },

});

const player =  add([
  z(5),
  sprite("Bruce_Wang", {
    animSpeed: 0.2,
    frame: 1,
  }),
  pos(100, 200),
  health(8),
  // Plain strings are tags, a quicker way to let us define behaviors for a group
  "player",
  "friendly",
 // Components are just plain objects, you can pass an object literal as a component.
  {
     dead: false,
      speed: 500
 }
])




scene("game", ()=>{

  loadBackground("grass"),
  add([
      sprite("obunga")
    ])
  add(player)
});




onKeyDown("d", ()=> {
  player.move(player.speed, 0);
  player.flipX = false
});

onKeyDown("a", ()=> {
  player.move(-player.speed, 0);
  player.flipX = true
});

onKeyDown("w", ()=> {
  player.move(0, -player.speed);
 
});

onKeyDown("s", ()=> {
  player.move(0, player.speed);
});

if(player != null){
  player.play("idle");
}

go("game");



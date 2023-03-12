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

loadSprite("Bruce_Wang", "assets/Bruce_Wang_SpriteSheet.png",{
  sliceX:4,
  sliceY:3,
  anims:{
    idle:{
      from: 0,
      to: 3,
      loop : true,
      speed: 2,
    },
    run:{
      from: 4, 
      to: 11,
      loop: true,
      speed: 15,
    }
  },

});




const player =  add([
  z(5),
  sprite("Bruce_Wang", {
    frame: 0,
  }),
  pos(100, 200),
  health(8),
  // Plain strings are tags, a quicker way to let us define behaviors for a group
  "player",
  "friendly",
 // Components are just plain objects, you can pass an object literal as a component.
  {
     dead: false,
      speed: 700
 }
])

player.play("idle");
const obunga = add([
  sprite("obunga"),
  pos(0, -275),
  {
    speed: 20
  }
])

scene("game", ()=>{

  loadBackground("grass"),
  add(obunga),
  add(player)
  onUpdate( () =>{
    obunga.move(0, 5)
  })
});




onKeyDown("d", ()=> {
  player.move(player.speed, 0);
  player.flipX = false
  if(player.curAnim() != "run")
  {
    player.play("run");
  }
});

onKeyDown("a", ()=> {
  player.move(-player.speed, 0);
  player.flipX = true
  if(player.curAnim() != "run")
  {
    player.play("run");
  }
});

onKeyDown("w", ()=> {
  player.move(0, -player.speed);
 
});

onKeyDown("s", ()=> {
  player.move(0, player.speed);
});

onKeyRelease("a", ()=>{
  player.play("idle")
})

onKeyRelease("d", ()=>{
  player.play("idle")
})

onKeyRelease("w", ()=>{
  player.play("idle")
})

onKeyRelease("s", ()=>{
  player.play("idle")
})

go("game");




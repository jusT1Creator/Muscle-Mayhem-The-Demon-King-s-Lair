import k from "./kabam.js"

function loadBackground(backgroundName, posX, posY){
    add([
        sprite(backgroundName),
        scale(width()/450, height()/450),
        pos(posX, posY)
    ]);
 }

 


document.body.style.overflow = 'hidden';

loadSprite("grass", "assets/Grass_Background.png");

loadSprite("obunga", "assets/OIP.png");

loadSprite("player", "assets/Ball.png");

loadSound("music", "assets/Bruce wang.m4a")

loadSound("overtaken", "assets/Overtaken.m4a")

loadSprite("Bruce_Wang", "assets/Bruce_Wang_SpriteSheet.png",{
  sliceX:4,
  sliceY:6,
  anims:{
    idle:{
      from: 0,
      to: 3,
      loop : true,
      speed: 2,
    },
    runHorizontal:{
      from: 4, 
      to: 11,
      loop: true,
      speed: 16,
    },
    runForward:{
      from: 12,
      to: 15,
      loop: true,
      speed: 8,
    },
    runBackward:{
      from: 16,
      to: 19,
      loop: true,
      speed: 8,
    },
    punch:{
      from: 20,
      to: 23,
      loop: false,
      speed: 18,
    }
  },

});


const music = play("overtaken", {
  volume: 0.5,
  loop: true,
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


export function Game(){
    loadBackground("grass", 0, 0),
  loadBackground("grass", -7765, 0),
  loadBackground("grass", 0, -4310),
  loadBackground("grass", -7765, -4310),
  add(obunga),
  add(player)
}

onKeyDown("d", ()=> {
    player.move(player.speed, 0);
    player.flipX = false
    if(player.curAnim() != "runHorizontal")
    {
      player.play("runHorizontal");
    }
  });
  
  onKeyDown("a", ()=> {
    player.move(-player.speed, 0);
    player.flipX = true
    if(player.curAnim() != "runHorizontal")
    {
      player.play("runHorizontal");
    }
  });
  
  onKeyDown("w", ()=> {
    player.move(0, -player.speed);
    if(player.curAnim() != "runHorizontal" && player.curAnim() != "runBackward") // I make sure going left and right animation takes priority, yet we might want to make a player state to handle it better
    {
      player.play("runBackward");
    }
  });
  
  onKeyDown("s", ()=> {
    player.move(0, player.speed);
    
    if(player.curAnim() != "runHorizontal" && player.curAnim() != "runForward") // I make sure going left and right animation takes priority, yet we might want to make a player state to handle it better
    {
      player.play("runForward");
    }
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
  
  
  
  
  
  
  onKeyPress("space", () => {  // <-------- !!!!!!!! Pause or unpause the music !!!!!!!!
    if (music.paused) {
      music.play()
    } else {
      music.paused = true
    }
  });
  
  player.onUpdate(() => {
      // Set the viewport center to player.pos
      camPos(player.worldPos())
  })
  
  obunga.onUpdate( () =>{
    obunga.move(0, 5)
  }) 
  
  onMouseDown("left", ()=>{
    player.play("punch");
  })
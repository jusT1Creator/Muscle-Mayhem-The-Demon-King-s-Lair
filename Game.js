import k from "./kabam.js"


let attackFieldPositionsX = [120, -50, 40];
let attackFieldPositionsY = [-100, 100, 0];
let attackFieldConditionX = attackFieldPositionsX[0];
let attackFieldConditionY = attackFieldPositionsY[2];




function loadBackground(backgroundName, posX, posY){


    const grassbackground = add([
        sprite(backgroundName),
        scale(width()/450, height()/450),
        pos(0, 0)
    ]);

    let spawnPositionX = posX * grassbackground.scale.x;
    let spawnPositionY = posY * grassbackground.scale.y;

    grassbackground.pos.x = spawnPositionX * 2000
    grassbackground.pos.y = spawnPositionY * 2000
 }

 


document.body.style.overflow = 'hidden';

//sprites:

loadSprite("grass", "assets/Grass_Background.png");

loadSprite("obunga", "assets/OIP.png");

loadSprite("player", "assets/Ball.png");

loadSound("music", "assets/Bruce wang.m4a")

loadSound("overtaken", "assets/Overtaken.m4a")

loadSprite("attackField", "assets/Player_Attack_Field.png")

loadSprite("ball", "assets/Ball.png")

loadSprite("Bruce_Wang", "assets/Bruce_Wang_SpriteSheet.png",{
  sliceX:4,
  sliceY:9,
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
      speed: 12,
    },
    kick:{
      from: 24,
      to: 26,
      loop: false,
      speed:12
    },
    airKickOne:{
      from: 27,
      to:32,
      loop: false,
      speed: 12
    },
    airKickTwo:{
      from: 33,
      to: 35,
      loop: false,
      speed: 12
    }
  },

});



//music;
const music = play("overtaken", {
  volume: 0.5,
  loop: true,
  paused: true
});

//entities:

const player =  add([
  z(5),
  sprite("Bruce_Wang", {
    frame: 0,
  }),
  pos(),
  health(8),
  area({ 
    scale: vec2(0.5, 1),
    offset: vec2(80, 0)
  }),
  // Plain strings are tags, a quicker way to let us define behaviors for a group
  "player",
  "friendly",
 // Components are just plain objects, you can pass an object literal as a component.
  {
     dead: false,
      speed: 700
 }
])




const playerAttackField = add([
  pos(),
  area({scale: vec2(1, 1)}),
  sprite("attackField")
])

let bISAttacking = false;



const enemy = add([
  sprite("ball"),
  area(),
  pos(1000, 1000),
  health(100),
  "enemy"
])

// enemy.use(sprite("obunga")) THIS IS SUPER FUCKING IMPORTANT!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

enemy.onUpdate(()=>{
  debug.log(enemy.hp());
  if(enemy.hp() <= 0){
    destroy(enemy);
  }
})

player.play("idle");
const obunga = add([
  sprite("obunga"),
  pos(0, -275),
  {
    speed: 20
  }
])

//scene

export function Game(){
    loadBackground("grass", 0, 0),
  loadBackground("grass", -1, 0),
  loadBackground("grass", 0, -1),
  loadBackground("grass", -1, -1),
  loadBackground("grass", 2, 0),
  loadBackground("grass", -2, 0),
  loadBackground("grass", 0, -2),
  loadBackground("grass", -2, -2),
  add(obunga),
  add(player),
  add(enemy)
 
  
}

//input

onKeyDown("d", ()=> {
    player.move(player.speed, 0);
    player.flipX = false
    if(player.curAnim() != "runHorizontal")
    {
      player.play("runHorizontal");
    }
    attackFieldConditionX = attackFieldPositionsX[0];
    attackFieldConditionY = attackFieldPositionsY[2];

    resetAttack()
  });
  
  onKeyDown("a", ()=> {
    player.move(-player.speed, 0);
    player.flipX = true
    if(player.curAnim() != "runHorizontal")
    {
      player.play("runHorizontal");
    }
    attackFieldConditionX = attackFieldPositionsX[1];
    attackFieldConditionY = attackFieldPositionsY[2];

    resetAttack()
  });
  
  onKeyDown("w", ()=> {
    player.move(0, -player.speed);
    if(player.curAnim() != "runHorizontal" && player.curAnim() != "runBackward") // I make sure going left and right animation takes priority, yet we might want to make a player state to handle it better
    {
      player.play("runBackward");
    }
    attackFieldConditionX = attackFieldPositionsX[2];
    attackFieldConditionY = attackFieldPositionsY[0];

    resetAttack()
  });
  
  onKeyDown("s", ()=> {
    player.move(0, player.speed);
    
    if(player.curAnim() != "runHorizontal" && player.curAnim() != "runForward") // I make sure going left and right animation takes priority, yet we might want to make a player state to handle it better
    {
      player.play("runForward");
    }
    attackFieldConditionX = attackFieldPositionsX[2];
    attackFieldConditionY = attackFieldPositionsY[1];

    resetAttack()
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
      music.paused = false;
    } else {
      music.paused = true
    }
  });
  
  let attackFieldPosition

  player.onUpdate(() => {
    attackFieldPosition = vec2(player.worldPos().x + attackFieldConditionX, player.worldPos().y + attackFieldConditionY)
      // Set the viewport center to player.pos
      camPos(player.worldPos())
    
  })
  
  obunga.onUpdate( () =>{
    obunga.move(0, 5)
  }) 
  
  function resetAttack(){
    bISAttacking = false;
    comboState = 0;
  }

  onMousePress("left", ()=>{
    
    Attack()
  })

  player.onClick(() => {
    debug.log("uhcuwhiwfwin")
  })

  debug.inspect = true

  export default  music;

  let comboState = 0;

  



  function Attack(){
    comboState++
   
    if(comboState == 1){
      player.play("punch")
    }
    else if(comboState == 2){
     
      player.play("kick")
    }
    else if(comboState == 3){
      player.play("airKickOne")
    }
    else if(comboState == 4){
      player.play("airKickTwo")
    }
   
    add(playerAttackField)
    playerAttackField.pos = vec2(attackFieldPosition)

    
    if(comboState >= 4){
      comboState = 0;
    }

    wait(0.05, ()=>{
      playerAttackField.destroy()
      
    })
   
  }


 

  
  playerAttackField.onCollide("enemy", (enemy)=>{
    let Dmg = 15;
    if(bISAttacking){
      if(comboState == 1){
        Dmg = 5;
      }
      else if(comboState == 2){
        Dmg = 7;
      }
      else if(comboState == 3){
        Dmg = 10;
      }
      enemy.hurt(Dmg)
    }
    bISAttacking = false;
})

  
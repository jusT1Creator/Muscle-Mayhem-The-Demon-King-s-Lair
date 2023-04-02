import k from "./kabam.js"


let attackFieldPositionsX = [70, -70, 0];
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
      speed: 15
    },
    airKickTwo:{
      from: 33,
      to: 35,
      loop: false,
      speed: 12
    }
  },

});


loadSprite("Vertical_Attacks", "assets/Vertical_attacks.png", {
  sliceX:5,
  sliceY:5,
  anims:{
    downAttackOne:{
      from: 0,
      to: 5,
      loop: false,
      speed:18
    },
    downAttackTwo:{
      from: 6,
      to: 10,
      loop: false,
      speed: 18
    },
    upAttackOne:{
      from: 11,
      to: 16,
      loop: false,
      speed: 15
    },
    upAttackTwo:{
      from: 17,
      to:  20,
      loop: false,
      speed: 15
    }

  }
})

loadSprite("slime", "assets/Slime_Jump_Forward_Sprite.png",{
  sliceX: 12,
  sliceY: 1,
  anims:{
    runForward:{
    from: 0,
    to: 11,
    loop: true,
    speed: 12
  }
}
})

//components

function enemyAttack(){
  let bCanAttack = true;
  return{
    attack(position)
    {
      if(bCanAttack)
      { 
      const enemyAttackField = add([
      pos(position),
      area({scale: vec2(8, 4)}),
      sprite("attackField"),
      anchor("center"),
     "enemyAttackField"
        ])
    bCanAttack = false;
    enemyAttackField.onCollide("player", ()=>{
      player.hurt(10);
        })
  
    wait(0.1, ()=>{
      enemyAttackField.destroy()
        })
    wait(2, ()=>{
      bCanAttack = true
    })
      }
    }
  }
}

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
  health(100),
  area({ 
    scale: vec2(0.5, 1)
  }),
  state("leftRight", ["leftRight", "up", "down"]),
  anchor("center"),
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
  sprite("attackField"),
  anchor("center"),
  "attackField"
])


function SpawnEnemies(posX, posY){
  add([
    sprite("slime",{
      anim: "runForward"
    }),
    area({ 
      scale: vec2(0.5, 0.5),
      offset: vec2(-10, 35)
    }),
    scale(vec2(5, 5)),
    pos(posX, posY),
    health(100),
    anchor("center"),
    enemyAttack(),
    state("idle", ["idle", "attack"]),
    "enemy"
  ])
}



// enemy.use(sprite("obunga")) THIS IS SUPER FUCKING IMPORTANT!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



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
  SpawnEnemies(1000, 1000),
  SpawnEnemies(500, 500),
 
  onUpdate("enemy", (enemy)=>{
    const dir = player.pos.sub(enemy.pos).unit()
    if(player.pos.x - enemy.pos.x  > 120 || player.pos.x - enemy.pos.x < -120 || player.pos.y - enemy.pos.y  > 150 || player.pos.y - enemy.pos.y < -150){
      enemy.move(dir.scale(200))
    } else{
     enemy.attack(enemy.pos)
    }

   
    debug.log(player.hp())
   
    if(enemy.hp() <= 0){
      destroy(enemy);
    }
  })
}                             




//input

onKeyDown("d", ()=> {
  resetAttack()
    player.move(player.speed, 0);
    player.flipX = false
    if(player.curAnim() != "runHorizontal")
    {
      player.play("runHorizontal");
    }
    attackFieldConditionX = attackFieldPositionsX[0];
    attackFieldConditionY = attackFieldPositionsY[2];

    player.enterState("leftRight");


   
  });
  
  onKeyDown("a", ()=> {
    resetAttack()
    player.move(-player.speed, 0);
    player.flipX = true
    if(player.curAnim() != "runHorizontal")
    {
      player.play("runHorizontal");
    }
    attackFieldConditionX = attackFieldPositionsX[1];
    attackFieldConditionY = attackFieldPositionsY[2];

    player.enterState("leftRight");

    
  });
  
  onKeyDown("w", ()=> {
    resetAttack()
    player.move(0, -player.speed);
    if(player.curAnim() != "runHorizontal" && player.curAnim() != "runBackward") // I make sure going left and right animation takes priority, yet we might want to make a player state to handle it better
    {
      player.play("runBackward");
    }
    attackFieldConditionX = attackFieldPositionsX[2];
    attackFieldConditionY = attackFieldPositionsY[0];

    player.enterState("up");

    
  });
  
  onKeyDown("s", ()=> {
    resetAttack()
    player.move(0, player.speed);
    
    if(player.curAnim() != "runHorizontal" && player.curAnim() != "runForward") // I make sure going left and right animation takes priority, yet we might want to make a player state to handle it better
    {
      player.play("runForward");
    }
    attackFieldConditionX = attackFieldPositionsX[2];
    attackFieldConditionY = attackFieldPositionsY[1];

    player.enterState("down");

   
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
  
  onKeyPress("s", ()=>{
    player.use(sprite("Bruce_Wang"))
  })
  onKeyPress("w", ()=>{
    player.use(sprite("Bruce_Wang"))
  })
  onKeyPress("a", ()=>{
    player.use(sprite("Bruce_Wang"))
  })
  onKeyPress("d", ()=>{
    player.use(sprite("Bruce_Wang"))
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

      if(player.hp() <= 0){
        player.destroy()
      }
    
  })
  
  let Obungaspeed = 20;

  obunga.onUpdate( () =>{
   
    if(player.pos.y - obunga.pos.y > 4000 || player.pos.y - obunga.pos.y < -4000 || player.pos.x - obunga.pos.x > 4000 || player.pos.x - obunga.pos.x < -4000){
      Obungaspeed = 10000;
    }
    const dir = player.pos.sub(obunga.pos).unit()
    obunga.move(dir.scale(Obungaspeed))
  }) 
  
  function resetAttack(){
    comboStateHorizontal = 0;
    comboStateDown = 0;
    comboStateUp = 0;
  }

  onMousePress("left", ()=>{
    Attack()
  })

  player.onClick(() => {
    debug.log("uhcuwhiwfwin")
  })

  debug.inspect = true

  

  let comboStateHorizontal = 0;
  let comboStateUp = 0;
  let comboStateDown = 0;

  


let isCollidingWithEnemy = false
let attackedEnemy

  playerAttackField.onCollideUpdate("enemy", (enemy)=>{
   isCollidingWithEnemy = true
   attackedEnemy = enemy
  })

  


  function Attack(){

    if(player.state === "down" || player.state === "up"){
      player.use(sprite("Vertical_Attacks"))
    }

    if(player.state === "leftRight"){
      comboStateHorizontal++
      HorizontalAnimation()
      
       if(comboStateHorizontal >= 4){
         comboStateHorizontal = 0;
       }   
    } else if(player.state === "down"){
      comboStateDown++
      downAttackAnimation()

      if(comboStateDown >= 2){
        comboStateDown = 0;
      }
    } else if(player.state === "up"){
      comboStateUp++
      upAttackAnimation()
      if(comboStateUp >= 2){
        comboStateUp = 0
      }
    }
  }



  function downAttackAnimation(){
    if(comboStateDown == 1){
      player.play("downAttackOne",{
        onEnd: ()=> ManageAttackField()
      })
    }
    if(comboStateDown == 2){
      player.play("downAttackTwo",{
        onEnd: ()=> ManageAttackField()
      })
    }
  }

  function upAttackAnimation(){
    if(comboStateUp == 1){
      player.play("upAttackOne",{
        onEnd: ()=> ManageAttackField()
      })
    }
    if(comboStateUp == 2){
      player.play("upAttackTwo",{
        onEnd: ()=> ManageAttackField()
      })
    }
  }



  function HorizontalAnimation(){
    if(comboStateHorizontal == 1){
      player.play("punch",{
        onEnd: ()=> ManageAttackField()
      })
    }
    else if(comboStateHorizontal == 2){
     
      player.play("kick",{
        onEnd: ()=> ManageAttackField()
      })
    }
    else if(comboStateHorizontal == 3){
      player.play("airKickOne",{
        onEnd: ()=> ManageAttackField()
      })
    }
    else if(comboStateHorizontal == 4){
      player.play("airKickTwo",{
        onEnd: ()=> ManageAttackField()
      })
    }
  }

  function ManageAttackField(){
    add(playerAttackField)
    playerAttackField.pos = vec2(attackFieldPosition)

    if(isCollidingWithEnemy){
      let Dmg = 15;
    if(player.state === "leftRight")
    {
      if(comboStateHorizontal == 1){
        Dmg = 5;
      }
      else if(comboStateHorizontal == 2){
        Dmg = 7;
      }
      else if(comboStateHorizontal == 3){
        Dmg = 10;
      }
    }

    if(player.state === "down" ){
      if(comboStateDown == 1){
        Dmg = 10;
      }
    }

    if( player.state === "up"){
      if(comboStateUp == 1){
        Dmg = 10;
      }
    }


      attackedEnemy.hurt(Dmg)




    }
    wait(0.01, ()=>{
      playerAttackField.destroy()
    })
   
  }

  export default  music;
 

  
  
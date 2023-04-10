import k from "./kabam.js"
import { GameOver } from "./GameOver.js";


scene("gameOver", GameOver)

let attackFieldPositionsX = [70, -70, 0];
let attackFieldPositionsY = [-75, 75, 0];
let attackFieldConditionX = attackFieldPositionsX[0];
let attackFieldConditionY = attackFieldPositionsY[2];

setGravity(0)

//debug.inspect = true


document.body.style.overflow = 'hidden';

//sprites:

loadSprite("grass", "assets/Grass_Background.png");

loadSprite("obunga", "assets/OIP.png");

loadSprite("player", "assets/Ball.png");

loadSound("music", "assets/Bruce wang.m4a")

loadSound("overtaken", "assets/Overtaken.m4a")

loadSound("villain_theme", "assets/villain_theme.mp3")

loadSound("game_Music", "assets/game_music.mp3")

loadSprite("attackField", "assets/Player_Attack_Field.png")

loadSprite("ball", "assets/Ball.png")

loadSprite("projectile_fast", "assets/fast_projectile.png")

loadSprite("projectile_explosion", "assets/projectile_explosion_spritesheet.png", {
  sliceX: 4,
  sliceY: 1,
  anims:{
    explosion:{
      from: 0,
      to: 3,
      loop: false,
      speed: 12
    }
  }
})

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

loadSprite("slime", "assets/Slime_sprite_sheet.png",{
  sliceX: 9,
  sliceY: 4,
  anims:{
    runForward:{
    from: 0,
    to: 12,
    loop: true,
    speed: 12
  },
  attack:{
    from:13,
    to:26,
    loop:false,
    speed: 15
  },
  death:{
    from: 27,
    to: 35,
    loop: false,
    speed: 15
  }
}
})

loadSprite("villain", "assets/villain_spriteSheet.png",{
  sliceX: 8,
  sliceY: 4,
  anims:{
    idle:{
      from: 8,
      to: 8,
      loop: false,
      speed: 1
    },
    move:{
      from: 0,
      to: 7,
      loop: true,
      speed: 8
    }, 
    attack:{
      from: 8,
      to: 16,
      loop: false,
      speed: 8
    },
    projectile:{
      from: 17,
      to: 27,
      loop: false,
      speed: 8,
    }
  }
})

loadSprite("slam_effect", "assets/slam_effect_spritesheet.png",{
  sliceX: 5,
  sliceY: 1,
  anims:{
    idle:{
      from: 0,
      to: 4,
      loop:false,
      speed: 12
    }
  }
})
//components



function enemyAttack(){
  let bCanAttack = true;
  let bInAttack = false;
  return{
    attack(position)
    {
      if(bCanAttack)
      { 
      const enemyAttackField = add([
      pos(position),
      area({scale: vec2(6, 3)}),
      sprite("attackField"),
      anchor("center"),
     "enemyAttackField"
        ])
    bCanAttack = false;
    enemyAttackField.onCollide("player", ()=>{
      player.hurt(10);
      shake(4)
        })
  
    wait(0.1, ()=>{
      enemyAttackField.destroy()
        })
    wait(2, ()=>{
      bCanAttack = true
    })
      }
    },
    getCanAttack(){
      return bCanAttack;
    },
    setCanAttack(value){
      bCanAttack = value
    },
    getInAttack(){
      return bInAttack;
    },
    setInAttack(value){
      bInAttack = value
    }
  }
}

function villainAttack(){
  let bCanAttack = true;
  let bCanShootProjectile = true;
  return{
    attack(position, damage)
    {
      if(bCanAttack)
      {
      shake(6) 
      const enemyAttackField = add([
      pos(position),
      area(),
      scale(vec2(9, 9)),
      sprite("slam_effect", {
        anim:"idle"
      }),
      anchor("center"),
     "enemyAttackField"
    ])
    bCanAttack = false;
    enemyAttackField.onCollide("player", ()=>{
      player.hurt(damage);
      shake(100)
      })
  
    enemyAttackField.onAnimEnd((anim) => {
      if (anim === "idle") {
            enemyAttackField.destroy();
      }
    })
    wait(2, ()=>{
      bCanAttack = true
    })
      }
    },setCanAttack(value){
      bCanAttack = value
      bCanShootProjectile = value
    }
    ,


    projectileAttack(playerPosition){
      
      if(bCanShootProjectile)
     { 
      
      const projectile = add([
        pos(villain.pos.x, villain.pos.y -50),
        area(),
        sprite("projectile_fast"),
        anchor("center"),
        projectieDestructionManager(),
        {
          speed: 2000
        }
      ])

      projectile.onCollide("player", ()=>{
        player.hurt(20);
        shake(4)
        projectile.explosion(projectile)
        })

      bCanShootProjectile = false;
      projectile.onUpdate(()=>{
          const dir = playerPosition.sub(projectile.pos).unit()
          projectile.move(dir.scale(projectile.speed))
          
          if(projectile.pos.x - playerPosition.x < 15 && projectile.pos.x - playerPosition.x  > -15 ){
            projectile.speed = 0
            projectile.explosion(projectile)
          }
      })
    
      wait(0.1, ()=>{
        bCanShootProjectile = true;

      })
    
     }
    }
  }
}

function projectieDestructionManager(){
  return{
    explosion(projectile){
      
      const projectileExplosion = add([
        sprite("projectile_explosion"),
        pos(projectile.pos)
      ])

      projectileExplosion.play("explosion",{
        onEnd: ()=> projectileExplosion.destroy()
      })

      projectile.destroy();
    }
  }
}
  


//music;
const music = play("game_Music", {
  volume: 0.5,
  loop: true,
  paused: true
});

const villainTheme = play("villain_theme",{
  volume:0.5,
  loop:true,
  paused: true
});

//entities:

const player =  add([
  z(5),
  sprite("Bruce_Wang", {
    frame: 0,
  }),
  pos(),
  body(),
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
    speed: 700,
    bIsMoving: false
 }
])

const villain = add([
  z(5),
  sprite("villain"),
  pos(0, 500),
  health(1000),
  area(),
  anchor("center"),
  state("idle", ["idle","moving", "attack"]),
  villainAttack(),
  "enemy",
  "villain",
  {
    dead: false,
    speed: 100,
    bInCloseRangeAttack: false,
    bAttackStateCalled: false,
  }
])

const healthBarVisualisationAssistant = player.add([
  rect(player.hp() * 3, 25),
  color(170, 170, 170),
  pos(-700, 300),
])


const healthBar = player.add([
  rect(player.hp() * 3, 25),
  pos(-700, 300),
  color(255, 0, 0)
])

healthBar.add([
  text("hp:", {size: 25})
])

const villainHealthBarVisualisationAssistant = add([
  rect(villain.hp(), 25),
  color(170, 170, 170),
  pos(0, 0),
])


const villainHealthBar = villainHealthBarVisualisationAssistant.add([
  rect(villain.hp(), 25),
  pos(0, 0),
  color(255, 0, 0)
])

villainHealthBar.add([
  text("hp:", {size: 25})
])




const playerAttackField = add([
  pos(),
  area({scale: vec2(1, 1)}),
  sprite("attackField"),
  anchor("center"),
  "attackField"
])


function SpawnEnemies(posX, posY){
  const slime = add([
    sprite("slime",{
      anim: "runForward"
    }),
    area({ 
      scale: vec2(0.5, 0.5),
    }),
    scale(vec2(5, 5)),
    pos(posX, posY),
    health(100),
    anchor("center"),
    enemyAttack(),
    enemyHealthBar(),
    state("idle", ["idle", "attack"]),
    "enemy",
    "slime",
    {
      bIsDead: false
    }
  ])
  slime.healthBar(slime)
}

  function enemyHealthBar(){
    let healthBar
    let healthBarSize
    let healthBarAssist
    return{
      healthBar(enemy){
        healthBarAssist = enemy.add([rect(10, 1), pos(0, 0), color(170, 170,170)])
        healthBar = enemy.add([rect(10, 1), pos(0, 0), color(255, 0,0)])
      }, healthBarActualisation(enemy){
        healthBarSize = enemy.hp() / 10
        healthBar.width = healthBarSize;
      }
    }
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

function resetPlayerHealth(){
  let ValueToReset = 100 - player.hp();
  player.heal(ValueToReset);
}

export function Game(){
  bHasLost = false
  player.pos = vec2(0,0),
  villain.enterState("idle"),
  villain.bAttackStateCalled = false,
  villain.setCanAttack(true),
  resetPlayerHealth(),
  addLevel([
    "||||||||",
    "|^^^^^^|",
    "|^^^^^^|",
    "|^^^^^^|",
    "|^^^^^^|",
    "|^^^^^^|",
    "|^^^^^^|",
    "||||||||",
  ], {
    tileWidth: 2048,
    tileHeight: 2048,
    pos: vec2(-2000, -2000),
    tiles: {
        "^": () => [
          sprite("grass"),
          anchor("center"),
          "background",
        ],
        "|": () => [
          sprite("grass"),
          anchor("center"),
          area(),
          body({ isStatic: true }),
          "wall",
        ],
    },
  }),
  //add(obunga),
  add(player),
  //add(villain),
  add(playerAttackField),
  SpawnEnemies(1000, 1000),
  SpawnEnemies(500, 500),
  onUpdate("slime", (enemy)=>{
    enemy.healthBarActualisation(enemy)
    const dir = player.pos.sub(enemy.pos).unit()
    if((player.pos.x - enemy.pos.x  > 120 || player.pos.x - enemy.pos.x < -120 || player.pos.y - enemy.pos.y  > 150 || player.pos.y - enemy.pos.y < -150) && enemy.getInAttack() == false && enemy.bIsDead == false){
      enemy.move(dir.scale(200))
      if(enemy.curAnim() != "runForward") 
    {
      enemy.play("runForward")
    }
    } else{
      if(enemy.curAnim() != "attack" && enemy.getCanAttack() == true) 
    {
      enemy.setInAttack(true)
      enemy.play("attack", {
        onEnd: ()=> {
          enemy.attack(enemy.pos)
          enemy.setInAttack(false)
        }
      })
    }
  }

  
   
    if(enemy.hp() <= 0){
      enemy.setCanAttack(false)
      enemy.bIsDead = true
      if(enemy.curAnim() != "death"){
        enemy.play("death", {
          onEnd: ()=>  destroy(enemy)
        })
      }
    }

  }),
  onUpdate(()=>{
    if(bHasLost){
      //go("gameOver")
      go("dungeon")
    }
  })
}

scene("dungeon", ()=>{
  bHasLost = false,
  player.pos = vec2(0,0),
  villain.enterState("idle"),
  villain.bAttackStateCalled = false,
  villain.setCanAttack(true),
  resetPlayerHealth(),
  add(player),
  add(villain),
  add(playerAttackField),
  music.paused = true;
  villainTheme.paused = false;
  add(villainHealthBarVisualisationAssistant)
  onUpdate(()=>{
    villainHealthBarVisualisationAssistant.pos = vec2(player.pos.x - 500, player.pos.y - 350)
    villainHealthBar.width = villain.hp()
    if(bHasLost){
      go("gameOver")
      villainTheme.paused = true;
    }
  })
})

let villainLookState = 2
let villainLookDirection = 2

villain.onStateUpdate("moving", ()=>{
  if(villain.curAnim() != "move") 
    {
      villain.play("move");
    }
  const dir = player.pos.sub(villain.pos).unit()
  if(player.pos.x - villain.pos.x  > 240 || player.pos.x - villain.pos.x < -240 || player.pos.y - villain.pos.y  > 240 || player.pos.y - villain.pos.y < -240){
    villain.bInCloseRangeAttack = false;
  }else{
    villain.bInCloseRangeAttack = true;
  }

  if(player.pos.x - villain.pos.x  > 50 || player.pos.x - villain.pos.x < -50 || player.pos.y - villain.pos.y  > 50 || player.pos.y - villain.pos.y < -50){
    villain.move(dir.scale(villain.speed))
  }else{
    if(villain.curAnim() != "idle") 
    {
      villain.play("idle");
    }
  }

  if(player.pos.x - villain.pos.x > 0){
    villainLookDirection = 1
  } else{
    villainLookDirection = 2
  }

  if(villainLookState != villainLookDirection){
    if(villainLookState == 1){
      villainLookState = 2
      villain.flipX = false
    }else if(villainLookState == 2){
      villainLookState = 1
      villain.flipX = true
    }
  }
  if(villain.bAttackStateCalled == false){
    villain.bAttackStateCalled = true;
    wait(2, ()=> {villain.enterState("attack")})
  }

  

})

villain.onStateEnter("attack", ()=>{

  if(!villain.bInCloseRangeAttack){
    if(villain.curAnim() != "projectile"){
      villain.play("projectile", {
        onEnd: async ()=> {
          for(let i = 0; i < 5; i++){
            await wait(0.2)
            villain.projectileAttack(player.pos)
          }
          
              
          
          wait(2, ()=> {villain.enterState("moving")
          villain.bAttackStateCalled = false;
          })
        }
      })
    }
  }
  if(villain.bInCloseRangeAttack)
  {if(villain.curAnim() != "attack") 
  {
    villain.play("attack", {
      onEnd: ()=> {
        villain.attack(villain.pos, 50)
        wait(2, ()=> {villain.enterState("moving")
        villain.bAttackStateCalled = false;
      })
      }
    })
  }
    
  }

  
})

villain.onStateEnter("idle", ()=>{
  villain.play("idle")
  wait(2, ()=> villain.enterState("moving"))
})

villain.on("death", () => {
  villain.destroy()
})



//input

onKeyPress("enter", ()=> {
 for(let i = 1; i < 50; i++){ 
  SpawnEnemies(i* 100 , i* 100)
}
})

onKeyDown("d", ()=> {
  player.bIsMoving = true;
  resetAttack()
    player.move(player.speed, 0);
    player.flipX = false
    if(player.curAnim() != "runHorizontal" && player.bIsMoving)
    {
      player.play("runHorizontal");
    }
    attackFieldConditionX = attackFieldPositionsX[0];
    attackFieldConditionY = attackFieldPositionsY[2];

    player.enterState("leftRight");
  });
  
  onKeyDown("a", ()=> {
    player.bIsMoving = true;
    resetAttack()
    player.move(-player.speed, 0);
    player.flipX = true
    if(player.curAnim() != "runHorizontal" && player.bIsMoving)
    {
      player.play("runHorizontal");
    }
    attackFieldConditionX = attackFieldPositionsX[1];
    attackFieldConditionY = attackFieldPositionsY[2];

    player.enterState("leftRight");
  });
  
  onKeyDown("w", ()=> {
    player.bIsMoving = true;
    resetAttack()
    player.move(0, -player.speed);
    if(player.curAnim() != "runHorizontal" && player.curAnim() != "runBackward" && player.bIsMoving && !isMousePressed("left")) // I make sure going left and right animation takes priority, yet we might want to make a player state to handle it better
    {
      player.play("runBackward");
    }
    attackFieldConditionX = attackFieldPositionsX[2];
    attackFieldConditionY = attackFieldPositionsY[0];

    player.enterState("up");
  });
  
  onKeyDown("s", ()=> {
    player.bIsMoving = true;
    resetAttack()
    player.move(0, player.speed);
    
    if(player.curAnim() != "runHorizontal" && player.curAnim() != "runForward" && player.bIsMoving  && !isMousePressed("left")) // I make sure going left and right animation takes priority, yet we might want to make a player state to handle it better
    {
      player.play("runForward");
    }
    attackFieldConditionX = attackFieldPositionsX[2];
    attackFieldConditionY = attackFieldPositionsY[1];

    player.enterState("down");
  });
  
  onKeyRelease("a", ()=>{
    player.play("idle")
    player.bIsMoving = false;
  })
  
  onKeyRelease("d", ()=>{
    player.play("idle")
    player.bIsMoving = false;
  })
  
  onKeyRelease("w", ()=>{
    player.play("idle")
    player.bIsMoving = false;
  })
  
  onKeyRelease("s", ()=>{
    player.play("idle")
    player.bIsMoving = false;
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
  let bHasLost

  player.on("death", () => {
    bHasLost = true
    player.destroy()
  })


  player.onUpdate(() => {
    attackFieldPosition = vec2(player.worldPos().x + attackFieldConditionX, player.worldPos().y + attackFieldConditionY)
      // Set the viewport center to player.pos
      camPos(player.worldPos())
      playerAttackField.pos = vec2(attackFieldPosition)
      healthBar.width = player.hp() * 3
      
  })
  
  /*let Obungaspeed = 20;

  obunga.onUpdate( () =>{
   
    if(player.pos.y - obunga.pos.y > 4000 || player.pos.y - obunga.pos.y < -4000 || player.pos.x - obunga.pos.x > 4000 || player.pos.x - obunga.pos.x < -4000){
      Obungaspeed = 10000;
    }
    const dir = player.pos.sub(obunga.pos).unit()
    obunga.move(dir.scale(Obungaspeed))
  }) */
  
  function resetAttack(){
    comboStateHorizontal = 0;
    comboStateDown = 0;
    comboStateUp = 0;
  }

  onMousePress("left", ()=>{
    if(!player.bIsMoving){
      Attack()
    }
  })

  player.onClick(() => {
    debug.log("uhcuwhiwfwin")
  })

 

  

  let comboStateHorizontal = 0;
  let comboStateUp = 0;
  let comboStateDown = 0;

  


let isCollidingWithEnemy = false
let attackedEnemy

  playerAttackField.onCollideUpdate("enemy", (enemy)=>{
    attackedEnemy = enemy
   isCollidingWithEnemy = true
  })

  playerAttackField.onCollideEnd("enemy", ()=>{
    attackedEnemy = null
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
        onEnd: ()=> ManageAttackEffects()
      })
    }
    if(comboStateDown == 2){
      player.play("downAttackTwo",{
        onEnd: ()=> ManageAttackEffects()
      })
    }
  }

  function upAttackAnimation(){
    if(comboStateUp == 1){
      player.play("upAttackOne",{
        onEnd: ()=> ManageAttackEffects()
      })
    }
    if(comboStateUp == 2){
      player.play("upAttackTwo",{
        onEnd: ()=> ManageAttackEffects()
      })
    }
  }



  function HorizontalAnimation(){
    if(comboStateHorizontal == 1){
      player.play("punch",{
        onEnd: ()=> ManageAttackEffects()
      })
    }
    else if(comboStateHorizontal == 2){
     
      player.play("kick",{
        onEnd: ()=> ManageAttackEffects()
      })
    }
    else if(comboStateHorizontal == 3){
      player.play("airKickOne",{
        onEnd: ()=> ManageAttackEffects()
      })
    }
    else if(comboStateHorizontal == 4){
      player.play("airKickTwo",{
        onEnd: ()=> ManageAttackEffects()
      })
    }
  }

  function ManageAttackEffects(){
    
    let knockBackForce = 6;
    if(isCollidingWithEnemy){
      let Dmg = 15;
    if(player.state === "leftRight")
    {
      if(comboStateHorizontal == 1){
        Dmg = 5;
        knockBackForce = 1
      }
      else if(comboStateHorizontal == 2){
        Dmg = 7;
        knockBackForce = 1
      }
      else if(comboStateHorizontal == 3){
        Dmg = 10;
        knockBackForce = 2
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


      

      let knockbackX
      let knockbackY

      if(attackFieldConditionX == 0){
        knockbackX = 0
      }else if(attackFieldConditionX < 0)
      {
        knockbackX = -75
      }else{
        knockbackX = 75
      }

      if(attackFieldConditionY == 0){
        knockbackY = 0
      }else if(attackFieldConditionY < 0)
      {
        knockbackY = -75
      }else{
        knockbackY = 75
      }

      knockbackX *= knockBackForce

      let knockBack = vec2(knockbackX, knockbackY)
      
      if(attackedEnemy != null){
        attackedEnemy.hurt(Dmg)
        attackedEnemy.moveBy(knockBack)  
      }
     
    }
   
   
  }

  export default  music;
 

  
  
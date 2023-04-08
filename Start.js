import k from "./kabam.js"
import { Game } from "./Game.js";
import music from "./Game.js";
import { Credits } from "./Credits.js";

scene("credits", Credits)
scene("game", Game)

loadSound("StartMusic", "assets/Aot relaxing music.m4a")

const Startmusic = play("StartMusic", {
	volume: 1,
	loop: true
})

loadSprite("Start_Screen", "assets/game_start_Screen_resized.png")



export function Start(){
	add([
		sprite("Start_Screen"),
		pos(0, 0),
		scale(width()/2048, height()/831),
	]),
    onUpdate(() => setCursor("default")),
	onUpdate(()=>{
		if (Startmusic.paused) {
			Startmusic.play()
		}
		music.paused = true;
	})
function addButton(txt, p, f) {

	// add a parent background object
	const btn = add([
		rect(240, 80, { radius: 8 }),
		pos(p),
		area(),
		scale(1),
		anchor("center"),
		outline(4),
	])

	// add a child object that displays the text
	btn.add([
		text(txt),
		anchor("center"),
		color(0, 0, 0),
	])

	// onHoverUpdate() comes from area() component
	// it runs every frame when the object is being hovered
	btn.onHoverUpdate(() => {
		const t = time() * 10
		btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
		btn.scale = vec2(1.2)
		setCursor("pointer")
	})

	// onHoverEnd() comes from area() component
	// it runs once when the object stopped being hovered
	btn.onHoverEnd(() => {
		btn.scale = vec2(1)
		btn.color = rgb()
	})

	// onClick() comes from area() component
	// it runs once when the object is clicked
	btn.onClick(f)

	return btn

}

addButton("Start", vec2(200, 100), () => {
	go("game")
	music.paused = false;
	Startmusic.paused = true;
})
addButton("Credits", vec2(200, 200), () => {
	go("credits")
	music.paused = false;
	Startmusic.paused = true;
})



const txt = add([
	text("I welcome you to our game,\nyour objective is to find the way\nto the secret layer of the villain and beat him.\nHowever this is no easy task,\nthe way is guarded by a hoard of slimes\naiming to beat you up!\nAre you ready for the challenge?", 
	{ size: 32, width: width() - 230, align: "left" }),
	pos(800, 700),
	anchor("center"),
	color(0, 0, 0),
])
}
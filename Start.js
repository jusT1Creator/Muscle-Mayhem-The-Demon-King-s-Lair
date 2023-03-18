import k from "./kabam.js"
import { Game } from "./Game.js";
import music from "./Game.js";

scene("game", Game)

loadSound("StartMusic", "assets/Aot relaxing music.m4a")

const Startmusic = play("StartMusic", {
	volume: 1,
	loop: true
})



export function Start(){
    onUpdate(() => setCursor("default")),
	onUpdate(()=>{
		if (Startmusic.paused) {
			debug.log("huedgsvuzfv")
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
addButton("Quit", vec2(200, 200), () => debug.log("bye"))

}
import k from "./kabam.js"
import { Start } from "./Start.js";
import { Credits } from "./Credits.js";

scene("credits", Credits)
scene("start", Start)

loadSound("StartMusic", "assets/Aot relaxing music.m4a")
loadSound("music", "assets/Bruce wang.m4a")

const victoryMusic = play("music", {
	volume: 0.7,
	loop: true,
	paused: true
})


export function GameWon(){
    setBackground(WHITE, 1),
    onUpdate(() => setCursor("default")),
	victoryMusic.paused = false
function addButton(txt, p, f) {

	// add a parent background object
	const btn = add([
		rect(500, 80, { radius: 8 }),
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

const txt = add([
	text("You WON!!", { size: 32, width: width() - 230, align: "center" }),
	pos(900, 400),
	anchor("center"),
	color(0, 255, 0),
])

addButton("Return to home screen", vec2(900, 500), () => {
	go("start")
	victoryMusic.paused = true
})
addButton("Credits", vec2(900, 600), () => {
	go("credits")
	victoryMusic.paused = true
})

}
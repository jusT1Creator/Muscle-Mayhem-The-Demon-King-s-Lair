import k from "./kabam.js"
import { Game } from "./Game.js";
import { Start } from "./Start.js";
import music from "./Game.js";

scene("game", Game)
scene("start", Start)

export function GameOver(){
	setBackground(BLACK, 1),
    onUpdate(() => setCursor("default")),
	onUpdate(()=>{
		music.paused = true;
	})
function addButton(txt, p, f) {

	// add a parent background object
	const btn = add([
		rect(400, 80, { radius: 8 }),
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

addButton("Start", vec2(900, 500), () => {
	go("game")
	music.paused = false;
})
addButton("Go to home Screen", vec2(900, 600), () => {
    go("start")
})



const txt = add([
	text("YOU LOST", { size: 32, width: width() - 230, align: "center" }),
	pos(900, 400),
	anchor("center"),
	color(255, 0, 0),
])



}


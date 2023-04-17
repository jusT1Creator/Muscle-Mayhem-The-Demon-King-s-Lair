import k from "./kabam.js"
import { Start } from "./Start.js";

scene("start", Start)
loadSprite("sonic", "assets/Sonic.png")

export function HowToPlay(){

	setBackground(BLACK, 1),
	add([
		sprite("sonic"),
		pos(),
		scale(1.55)
	])
    onUpdate(() => setCursor("default"))
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

addButton("Return to home screen", vec2(width() / 2, height() / 1.4), () => {
	go("start")
})

let HowToPlayText = `
W - walk up
A - walk left
S - walk down
D - walk right
lmb - Attack
rmb - heal
`


const txt = add([
	text(HowToPlayText, { size: 32, width: width() - 230, align: "center" }),
	pos(width() / 2, height() / 2),
	anchor("center"),
	color(255, 255, 255),
])

}
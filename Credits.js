import k from "./kabam.js"
import music from "./Game.js";
import { Start } from "./Start.js";

scene("start", Start)

export function Credits(){

	setBackground(BLACK, 1),
    onUpdate(() => setCursor("default")),
	onUpdate(()=>{
		//if (Startmusic.paused) {
		//	Startmusic.play()
		//}
		music.paused = true;
	})
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

addButton("Return to home screen", vec2(900, 700), () => {
	go("start")
	music.paused = true;
	//Startmusic.paused = true;
})

let creditsText = `
This game was developed and designed by: 
De Simone Tiziano
Sklodowski Marcin
Samayoa-Usher Ian Enrique
Jacobs Nathan

Music used

Glorious Morning 2 || Waterflame
進撃gt20130218巨人 || Hiroyuki Sawano
Jet Set Run || Yuki Hayashi
オール・フォー・ワンの力 || Yuki Hayashi
`


const txt = add([
	text(creditsText, { size: 32, width: width() - 230, align: "center" }),
	pos(900, 400),
	anchor("center"),
	color(255, 255, 255),
])

}
let fractal
let fractalsConfig = {
	BaseFractal: {
		name: "Ничего",
		cls: BaseFractal,
		x: 0,
		y: 0,
		scl: 0
	},
	KochSnowflake: {
		name: "Снежинка&nbsp;Коха",
		cls: KochSnowflake,
		y: 150,
		scl: 300
	},
	TSquare: {
		name: "Т-Квадрат",
		cls: TSquare,
		y: 200,
		scl: 500
	},
	HFractal: {
		name: "Н-Фрактал",
		cls: HFractal,
		y: 200,
		scl: 500
	},
	SierpinskiTriangle: {
		name: "Треугольник&nbsp;Серпинского",
		cls: SierpinskiTriangle,
		y: 175,
		scl: 450
	},
	PTree: {
		name: "Древо&nbsp;Пифагора",
		cls: PythagorasTree,
		y: 395,
		scl: 1000
	},
	LevyCCurve: {
		name: "Кривая&nbsp;Леви",
		cls: LevyCCurve,
		y: 275,
		scl: 1000
	},
	Dragon: {
		name: "Дракон",
		cls: Dragon,
		y: 275,
		scl: 1800
	}
}
let controls = {
	canvas: null,
	fractalButtons: [],
	nextStep: null,
	prevStep: null
}

function windowResized() {
	fractal.x = ($('#canvas').innerWidth() - ($('#canvas').innerWidth() / 4))
	redraw()
  resizeCanvas($('#canvas').innerWidth(), 400);
}

function setup() {
	controls.canvas = createCanvas($('#canvas').innerWidth(), 400)
	controls.canvas.parent('canvas')
	noLoop()
	loadFractal('KochSnowflake')

	let margin = 20
	let offset = {}
	offset.x = margin

	let nav = $('.masthead .nav')
	Object.keys(fractalsConfig).forEach((el, ind) => {
		let name = el
		if (name == 'BaseFractal') 
			return
		let conf = fractalsConfig[name]
		nav.append('<li class="nav-item name" id="' + name +'"">')

		let button = createElement('a', conf.name)
		offset.y = margin + ((ind) ? 31 * (ind - 1)  : 0)
		button.class('nav-link')
		button.attribute('href', '#')
		button.parent(name)
		button.mousePressed(() =>{ 
			loadFractal(name)
		})
		controls.fractalButtons.push()
	})
	// controls.nextStep = createButton('Драути', offset.x, offset.y)
	// fractal = new LevyCCurve(500, 400, 800)
}

function draw() {
	background(255)
	fractal.draw()
}

function loadFractal(fractalName) {
	let conf = fractalsConfig[fractalName]
	fractal = new conf.cls(($('#canvas').innerWidth() - ($('#canvas').innerWidth() / 4)), conf.y, conf.scl)
	$('.masthead h3').html(conf.name)
	$('#step').val(0)
	nextStep()
}

$('#prevStep').click(prevStep)
$('#nextStep').click(nextStep)
$('#goToStep').click(goToStep)

function nextStep() {
	let nextStep = parseInt($('#step').val())
	if (nextStep > fractal.limit)
			return
	if (fractal.makeAStep()) {
		redraw()
		$('#step').val(nextStep + 1)
	}
}

function prevStep() {
	let nextStep = parseInt($('#step').val()) - 1
	nextStep = (nextStep > 0) ? nextStep : 1
	$('#step').val(nextStep)
	if (nextStep >= fractal.limit)
			$('#step').val(fractal.limit.toString())
	fractal.goToStep(nextStep)
	redraw()
}

function goToStep() {
	let nextStep = parseInt($('#step').val())
	fractal.goToStep(nextStep)
	$('#step').val(fractal.step.toString())
	redraw()
}

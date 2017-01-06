/**
 * Интерфейс для всех фракталов
 *
 * @interface
 */
class BaseFractal {
	/**
	 * @constructor
	 * @param  {float}  x   - Начальная позиция по x
	 * @param  {float}  y   - Начальная позиция по y
	 * @param  {float}  scl - Масштаб
	 */
	constructor(x, y, scl) {
		this.x = x
		this.y = y
		this.scl = scl
		this.els = []
		this.step = 0
		this.limit = 10
		this.offsetX
	}

	/**
	 * Самый первый шаг
	 * @abstract
	 */

	doFirstStep() {}

	/**
	 * Следующий шаг
	 * @abstract
	 * @param  {bool}  reversed  - Шаг в обратную сторону
	 * @return {bool}  maked
	 */
	makeAStep(reversed) {
		/*
			if (!this.step) this.doFirstStep()
			if (this.step > this.limit) 
				return false
		*/
		this.step++
	}

	/**
	 * 8:16, 6.1.2017, дедлайн через 7 часов
	 * @param {integer} step - шаг
	 */
	goToStep(step) {
		console.log(step)
		this.els = []
		this.doFirstStep()
		console.log(this.step)
		if (step > 1)
			while((this.step < step) && (this.step <= this.limit))
				this.makeAStep()
	}

	/**
	 * Отрисовать фрактал
	 * @abstract
	 */
	draw() {}
}

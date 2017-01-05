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
		this.step = 0
		this.drawedStep = -1
	}

	/**
	 * Следующий шаг
	 * @abstract
	 * @param  {bool}  reversed  - Шаг в обратную сторону
	 * @return {bool}  maked
	 */
	makeAStep(reversed) {}

	/**
	 * Отрисовать фрактал
	 * @abstract
	 */
	draw() {}
}

class BaseFractal {
    /**
     * @constructor
     * @param  {float}  x   - Начальная позиция по x
     * @param  {float}  y   - Начальная позиция по y
     * @param  {float}  scl - Масштаб
     */
    constructor(x, y, scl) {
        this.x = x;
        this.y = y;
        this.scl = scl;
    }

    /**
     * Следующий шаг
     */
    nextStep() {}

    /**
     * Отрисовать фрактал
     */
    draw() {}
}

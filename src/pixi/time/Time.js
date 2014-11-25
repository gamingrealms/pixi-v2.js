PIXI.Time = function (targetFrameRate, minFrameRate) {
    if (targetFrameRate !== undefined) {
        this.setTargetFrameRate(targetFrameRate);
    }
    if (minFrameRate !== undefined) {
        this.setMinFrameRate(minFrameRate);
    }
};

PIXI.Time.prototype = {
    timeScale: 1,
    _tFrameRate: 60,
    _minFrameRate: 12,
    _tMilli: 1000 / 60,
    _minMilli: 1000 / 12,
    _prevMilli: Date.now(),

    setTargetFrameRate: function (framerate) {
        this._tFrameRate = framerate;
        this._tMilli = 1000 / framerate;
    },

    getTargetFrameRate: function () {
        return this._tFrameRate;
    },

    setMinFrameRate: function (framerate) {
        if (framerate > this._tFrameRate) {
            throw 'Your target minimum framerate must be smaller than your target framerate: ' + this._tFrameRate;
        } else {

            this._minFrameRate = framerate;
            this._minMilli = 1000 / framerate;
        }
    },

    getMinFrameRate: function () {
        return this._minFrameRate;
    },

    update: function () {
        var curMilli = Date.now();
        var milliDif = curMilli - this._prevMilli;
        if (milliDif > this._minMilli) {
            milliDif = this._minMilli;
        }
        this.timeScale = milliDif / this._tMilli;
        this._prevMilli = curMilli;
    }
};

Object.defineProperty(PIXI.Time.prototype, 'targetFrameRate', {
    get: PIXI.Time.getTargetFrameRate,
    set: PIXI.Time.setTargetFrameRate
});

Object.defineProperty(PIXI.Time.prototype, 'minFrameRate', {

    get: PIXI.Time.getMinFrameRate,
    set: PIXI.Time.setMinFrameRate
});
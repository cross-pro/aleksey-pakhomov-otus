import {Transform} from "stream"
import {once} from "events";

class LineTransformer extends Transform {

    constructor(opts) {
        super(opts)
    }

    _transform = function (chunk, encoding, done) {
        let data = chunk.toString()
        if (this._lastLineData) data = this._lastLineData + data

        let lines = data.split('\n')

        this._lastLineData = lines.splice(lines.length - 1, 1)[0]

        lines.forEach(this.push.bind(this))
        done()
    }

    _flush = function (done) {
        if (this._lastLineData) this.push(this._lastLineData)
        this._lastLineData = null
        done()
    }
}

export {LineTransformer}
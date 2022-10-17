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

        this.pause()
        lines.forEach(this.push.bind(this))
        this.resume()
        done()
    }

    _flush = function (done) {
        if (this._lastLineData) this.push(this._lastLineData)
        this._lastLineData = null
        done()
    }

    _read(size) {
        //console.log("readed:",size,"bytes")
        //this.pause()
        return super._read(size)

    }

   /* async write(data) {
        let canWrite = super.write(data.toString())
        if (!canWrite) {
            await once(this, "drain")
        }
    }*/
}

export {LineTransformer}
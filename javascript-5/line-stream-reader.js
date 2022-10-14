import {Readable} from "stream";

/**
 * возвращает каждую строку отдельным чанком
 */
class LineStreamReader extends Readable {

    buffer = "hello\nnigga\nI won\n!!!"

    constructor(opt) {
        super(opt)
    }

    _read(size) {

        if (this.hasNext()) {
            let buf = Buffer.from(`${this.nextChunk()}`, "utf-8")
            this.push(buf)
        } else {
            this.push(null)
        }
    }

    hasNext() {
        if (this.buffer === null || this.buffer.length === 0) {
            return false
        } else {
            return true
        }
    }

    nextChunk() {
        if (this.buffer === null || this.buffer.length === 0) {
            return
        }

        let line = ""
        for (let i = 0; i <= this.buffer.length; i++) {
            let c = this.buffer[i]
            if (c === "\n" || i === this.buffer.length) {
                this.buffer = this.buffer.substr(i + 1)
                return line
            }
            else
                line += c
        }
    }

}

export {LineStreamReader}
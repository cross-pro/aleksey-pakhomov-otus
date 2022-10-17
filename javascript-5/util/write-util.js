import {once} from "events";

export async function writeLine(writer, data) {
    try {
        let canWrite = writer.write(data + "\n")

        if (!canWrite) {
            await doJob()
        }

    } catch (e) {
        console.error(e)
        throw e
    }

    async function doJob() {
        await once(writer, 'drain')
    }

}

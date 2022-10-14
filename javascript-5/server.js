import {ReadStream} from "fs"

new http.Server(function(req, res) {
    // res instanceof http.ServerResponse < stream.Writable

    if (req.url == '/big.html') {

        var file = new ReadStream('big.html');
        sendFile(file, res);

    }
}).listen(3000);

function sendFile(file, res) {

    file.on('readable', write);

    function write() {
        var fileContent = file.read();

        res.write(fileContent);
    }
}
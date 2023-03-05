const http = require("http")
const url = require("url")
const fs = require('fs')
const util = require("util")
const child_process = require('child_process')

const ip_address = getIPAdress()
const port = 55903
const data_directory = process.argv.splice(2)[0]

http.createServer(function (request, response) {
    const req_url = url.parse(request.url, true)
    const pathname = req_url.pathname
    const query = req_url.query
    console.log(req_url.path)
    // console.log(pathname)
    // console.log(req_url)
    // console.log(query)
    switch (pathname) {
        case "/":
            fs.readFile("index.html", function (err, data) {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(data.toString());
                response.end();
            })
            break
        case "/file":
            fs.readFile(query.path, function (err, data) {
                response.writeHead(200, { "Content-Type": "text/javascript" });
                response.write(data.toString());
                response.end();
            })
            break
        case "/data":
            response.writeHead(200, { "Content-Type": "application/json" })
            switch (query.task) {
                case "data_list":
                    fs.readdir(data_directory, function (err, files) {
                        const data_list = files.reverse()
                        const result = {
                            data_list,
                            data_directory
                        }
                        response.write(JSON.stringify(result))
                        response.end()
                    })
                    break
                case "scan_names":
                    /*
                     * data_folders: list of data folder names
                     */
                    const result = {}
                    const data_folders = JSON.parse(query.data_folders)
                    data_folders.forEach(folder => {
                        const data_folder = data_directory + "/" + folder
                        const stdout=child_process.execSync("python library/getScanNames.py " + data_folder)
                        result[folder] = JSON.parse(stdout)
                    });
                    response.write(JSON.stringify(result))
                    response.end()
                    break
            }
            break
    }
}).listen(port, function () {
    console.log("Please run this command from your local computer to enable port forwarding");
    console.log(util.format("ssh -L %d:localhost:%d -N nmrsu@%s\n", port, port, ip_address));
    console.log(util.format("bruker2bids is running at: http://localhost:%d", port))
});



// utils
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
import { http } from "../lib/coreLibraries.js";

const server = http.createServer((req, res) => {
    res.write('It works');

    res.end();
})

server.listen(5050);
console.log('Server is listening on http://localhost:5050...');
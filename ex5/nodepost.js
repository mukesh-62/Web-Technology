
const http = require('http');
const url = require('url');
const fs = require('fs');


const server = http.createServer((req, res) => {

    const { pathname } = url.parse(req.url, true);


    if (pathname === '/') {
        fs.readFile('formpost.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (pathname === '/submit' && req.method === 'POST') {
       
        let formData = '';

       
        req.on('data', chunk => {
            formData += chunk.toString();
        });

        
        req.on('end', () => {
            const parsedFormData = new URLSearchParams(formData);

 
            const name = parsedFormData.get('name');
            
            const gender = parsedFormData.get('gender');
            const branch = parsedFormData.get('branch');
            const mobile = parsedFormData.get('mobile');
            const branchAddress = parsedFormData.get('branchAddress');

          
            res.statusCode = 200;
           
            res.setHeader('Content-Type', 'text/html');
           
            res.end(`
                <html>
                    <head>
                        <title>Form</title>
                        <style>
                            body {
                                text-align: center; 
                            }
                            h1 {
                                margin-top: 30px; 
                            }
                            table {
                                border-collapse: collapse;
                                width: 50%;
                                margin: 0 auto; 
                            }
                            th {
                                font-weight: bold;
                                text-align: left;
                            }
                            td {
                                border: 1px solid black;
                                padding: 8px;
                                text-align: left;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Submitted Information</h1>
                        <table>
                            <tr>
                                <td> Name</td>
                                <td>${name}</td>
                            </tr>
                           
                            <tr>
                                <td>Gender</td>
                                <td>${gender}</td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td>${branch}</td>
                            </tr>
                            <tr>
                                <td>Mobile Number</td>
                                <td>${mobile}</td>
                            </tr>
                            <tr>
                                <td> Address</td>
                                <td>${branchAddress}</td>
                            </tr>
                        </table>
                    </body>
                </html>
            `);
        });
    } else {
       
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Method Not Allowed');
    }
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
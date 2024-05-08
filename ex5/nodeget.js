
const http = require('http');
const url = require('url');
const fs = require('fs');


const server = http.createServer((req, res) => {
  
    const { pathname } = url.parse(req.url, true);


    if (pathname === '/') {
        fs.readFile('formget.html', (err, data) => {
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
    } else if (pathname === '/submit' && req.method === 'GET') {
       
        const { name,  gender, branch, mobile, branchAddress } = url.parse(req.url, true).query;

        res.statusCode = 200;
        
        res.setHeader('Content-Type', 'text/html');
       
        res.end(`
            <html>
                <head>
                    <title>Form Submission</title>
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
                    <h1></h1>
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

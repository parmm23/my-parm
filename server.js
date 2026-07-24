const http = require('http');
const { Pool } = require('pg');

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// กำหนด Port
const port = process.env.PORT || 3000;

// สร้าง Web Server
const server = http.createServer(async (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    try {

        // เชื่อมต่อฐานข้อมูล
        const client = await pool.connect();

        // ดึงข้อมูลจากตาราง students
        const result = await client.query('SELECT * FROM students');

        // คืนการเชื่อมต่อ
        client.release();

        let html = `
<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>Student Database</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Tahoma, sans-serif;
    background:linear-gradient(135deg,#74b9ff,#dfe6e9);
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
}

.container{
    width:900px;
    background:white;
    border-radius:20px;
    padding:35px;
    box-shadow:0 10px 30px rgba(0,0,0,.25);
}

h1{
    text-align:center;
    color:#0984e3;
    margin-bottom:10px;
}

p{
    text-align:center;
    color:#666;
    margin-bottom:25px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th{
    background:#0984e3;
    color:white;
    padding:15px;
    font-size:18px;
}

td{
    padding:12px;
    text-align:center;
    border-bottom:1px solid #ddd;
}

tr:nth-child(even){
    background:#f8f9fa;
}

tr:hover{
    background:#dff9fb;
    transition:.3s;
}

.status{
    width:250px;
    margin:25px auto 0;
    padding:12px;
    background:#00b894;
    color:white;
    text-align:center;
    border-radius:30px;
    font-weight:bold;
}

.footer{
    margin-top:25px;
    text-align:center;
    color:#888;
}

</style>

</head>

<body>

<div class="container">

<h1>🎓 ฐานข้อมูลนักศึกษา</h1>

<p>Node.js + PostgreSQL + Railway</p>

<table>

<tr>
<th>รหัสนักศึกษา</th>
<th>ชื่อ - นามสกุล</th>
</tr>
`;

        // แสดงข้อมูลนักศึกษา
        result.rows.forEach(row => {

            html += `
<tr>
<td>${row.student_id}</td>
<td>${row.student_name}</td>
</tr>
`;

        });

        html += `
</table>

<div class="status">
✅ เชื่อมต่อฐานข้อมูลสำเร็จ
</div>

<div class="footer">
จัดทำโดย <b>นางสาวนริศรา โมราวรรณ์</b><br>
Information Technology
</div>

</div>

</body>
</html>
`;

        res.end(html);

    } catch (err) {

        console.error(err);

        res.end(`
<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<style>
body{
    font-family:Tahoma;
    background:#ffeaea;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
}
.box{
    background:white;
    padding:40px;
    border-radius:20px;
    text-align:center;
    box-shadow:0 10px 20px rgba(0,0,0,.2);
}
h1{
    color:red;
}
</style>
</head>

<body>

<div class="box">

<h1>❌ เกิดข้อผิดพลาด</h1>

<p>${err.message}</p>

<p>กรุณาตรวจสอบฐานข้อมูล PostgreSQL หรือ Railway</p>

</div>

</body>
</html>
`);

    }

});

// เปิดใช้งาน Server
server.listen(port, () => {

    console.log("=================================");
    console.log("🚀 Server Started Successfully");
    console.log(`🌐 Running on Port : ${port}`);
    console.log("💾 PostgreSQL Connected");
    console.log("=================================");

});

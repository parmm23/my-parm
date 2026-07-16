// 1. เรียกใชงาน Module ที่ชื่อวา 'http' ซึ่งเปนระบบพื้นฐานของ Node.js สําหรับทําเซิรฟเวอร
 const http = require('http');

 // 2. กําหนดชองทาง (Port) ที่เซิรฟเวอรจะใชสื่อสาร โดยใหใชของที่ Cloud กําหนด
 const port = process.env.PORT || 3000;

 // 3. สรางเครื่องแมขาย (Server) ที่คอยรับคําขอ (req) และตอบกลับ (res)
 const server = http.createServer((req, res) => {

 // 3.1 ตั้งรหัสสถานะ 200 หมายถึง "ทํางานสําเร็จ (OK)"
 res.statusCode = 200;

 // 3.2 บอกเบราวเซอรของผูใชวา สิ่งที่สงกลับไปคือไฟลขอความแบบ HTML แลรองขอให UTF-8
 res.setHeader('Content-Type', 'text/html; charset=utf-8');

// 3.3 สงขอมูลหนาเว็บกลับไปหาผูใช
res.end(`
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Server ของฉัน</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            padding: 50px 40px;
            text-align: center;
            max-width: 600px;
            animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        h1 {
            color: #333;
            font-size: 2.5em;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .welcome {
            color: #555;
            font-size: 1.1em;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: left;
        }
        
        .info-box p {
            color: #666;
            margin: 10px 0;
            font-size: 1em;
        }
        
        .info-box strong {
            color: #333;
        }
        
        .status {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            margin-top: 20px;
            font-weight: bold;
        }
        
        footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #999;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 ยินดีต้อนรับ!</h1>
        <p class="welcome">สวัสดีค่ะ! นี่คือ Web Server ของ นางสาวนริศรา โมราวรรณ์</p>
        
        <div class="info-box">
            <p><strong>รหัสนักศึกษา:</strong> 69319010134</p>
            <p><strong>สถานะ:</strong> Server ทำงานปกติ ✓</p>
            <p><strong>Port:</strong> ${port}</p>
        </div>
        
        <div class="status">✓ สถานะ: Online</div>
        
        <footer>
            <p>Server is running successfully! เครื่องแม่ข่ายเปิดทำงานแล้ว</p>
        </footer>
    </div>
</body>
</html>
`);
 });

 // 4. สั่งใหเซิรฟเวอรเริ่มตนเปดรับฟงการเชื่อมตอตาม Port ที่กําหนดไว
 server.listen(port, () => {
 console.log(`Server is running! เครื่องแม่ข่ายเปิดทํางานแล้วที่ช่องทาง: ${port}`);
 });

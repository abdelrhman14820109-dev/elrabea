const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // اكتب كلمة المرور الخاصة بقاعدة البيانات إن وجدت
    database: 'children_center_project'
});

connection.connect((err) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات: ' + err.stack);
        return;
    }
    console.log('تم الاتصال بقاعدة البيانات بنجاح كـ ID: ' + connection.threadId);
});

module.exports = connection;
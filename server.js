const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// مسار ملف الحفظ المحلي
const DATA_FILE = path.join(__dirname, 'children_data.json');

// دالة قراءة البيانات
function getChildrenData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
}

// دالة حفظ البيانات
function saveChildrenData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// 1. اختبار عمل السيرفر
app.get('/', (req, res) => {
    res.json({ message: "منظومة مركز الربيع تعمل بكفاءة وبدون برامج إضافية!" });
});

// 2. تسجيل مريض جديد وحفظه
app.post('/api/register', (req, res) => {
    try {
        const { full_name, phone, child_name, birth_date, age, nationality, days, hours, service_type } = req.body;
        
        const children = getChildrenData();
        const newChild = {
            id: children.length + 1,
            full_name: child_name || full_name,
            parent_name: full_name,
            phone: phone,
            date_of_birth: birth_date,
            age: age,
            nationality: nationality,
            medical_history: `الجلسة: ${service_type || 'تأهيل'} | الساعات: ${hours || '-'} | الأيام: ${days || '-'}`,
            created_at: new Date().toISOString().substring(0, 10)
        };

        children.push(newChild);
        saveChildrenData(children);

        console.log("تم تسجيل حالة جديدة:", newChild.full_name);
        res.json({ success: true, message: "تم تسجيل البيانات بنجاح في النظام!", child: newChild });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "حدث خطأ أثناء حفظ البيانات" });
    }
});

// 3. جلب كافة الأطفال المسجلين (للسكرتيرة والدكتور)
app.get('/api/children', (req, res) => {
    const children = getChildrenData();
    res.json(children);
});

app.listen(PORT, () => {
    console.log(`✅ الخادم يعمل بنجاح وبسرعة على الرابط: http://localhost:${PORT}`);
});
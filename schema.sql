-- 1. جدول المستخدمين (الأطباء، الموظفين، وأولياء الأمور)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'receptionist', 'accountant', 'medical_director', 'consultant', 'senior_doctor', 'junior_doctor', 'speech_therapist', 'parent') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. جدول الأطفال (المرضى)
CREATE TABLE children (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_id INT,
    full_name VARCHAR(150) NOT NULL,
    gender ENUM('Male', 'Female'),
    date_of_birth DATE NOT NULL,
    medical_history TEXT,
    referral_source VARCHAR(100),
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. جدول الخدمات والباقات
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INT DEFAULT 45,
    is_package BOOLEAN DEFAULT FALSE,
    sessions_count INT DEFAULT 1
);

-- 4. جدول الحجوزات والجلسات (QR Code Attendance)
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    doctor_id INT,
    service_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('scheduled', 'completed', 'cancelled', 'absent') DEFAULT 'scheduled',
    qr_code VARCHAR(255) UNIQUE,
    attended_at DATETIME,
    FOREIGN KEY (child_id) REFERENCES children(id),
    FOREIGN KEY (doctor_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- 5. جدول الحسابات والسندات المالية
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    type ENUM('receipt', 'expense') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (child_id) REFERENCES children(id)
);
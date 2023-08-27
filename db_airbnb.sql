CREATE DATABASE db_airbnb;
USE db_airbnb;

CREATE TABLE user(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    full_name NVARCHAR(255),
    email VARCHAR(255),
    pass_word VARCHAR(255),
    phone VARCHAR(10),
    birth_day VARCHAR(20),
    gender BOOLEAN,
    avatar VARCHAR(500),
    role VARCHAR(10)
);

CREATE TABLE place(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    place_name VARCHAR(100),
    province VARCHAR(100),
    country VARCHAR(100),
    image VARCHAR(100)
);

CREATE TABLE room(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    room_name VARCHAR(200),
    user_id INT,
    bedroom INT,
    bed INT,
    bathroom INT,
    description VARCHAR(500),
    price INT,
    washing_machine BOOLEAN,
    iron BOOLEAN,
    television BOOLEAN,
    air_conditioner BOOLEAN,
    wifi BOOLEAN,
    stove BOOLEAN,
    parking BOOLEAN,
    image VARCHAR(500),
    place_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (place_id) REFERENCES place(id)
);

CREATE TABLE book_room(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    room_id INT,
    arrival_date DATETIME,
    departure_date DATETIME,
    numbers_of_guest INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE comment(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    room_id INT,
    user_id INT,
    date_comment DATETIME,
    content NVARCHAR(1000),
    stars INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (room_id) REFERENCES room(id)
);

INSERT INTO user VALUES
(0,'admin','admin@gmail.com','',null,'2008-11-11',true,'','ADMIN'),
(0,'Nguyễn Đức Tấn','ductan1@gmail.com','',null,'2008-11-11',true,'','USER');

INSERT INTO place VALUES
(0,'Quận 1','Hồ Chí Minh','Việt Nam','https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg'),
(0,'Cái Răng','Cần Thơ','Việt Nam','https://airbnbnew.cybersoft.edu.vn/images/vt2.jpg'),
(0,'Hòn Rùa','Nha Trang','Việt Nam','https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg'),
(0,'Hoàn Kiếm','Hà Nội','Việt Nam','https://airbnbnew.cybersoft.edu.vn/images/vt4.jpg'),
(0,'Hòn Tằm','Phú Quốc','Việt Nam','https://airbnbnew.cybersoft.edu.vn/images/vt5.jpg');

INSERT INTO room VALUES
(0,'NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!',2,1,2,1,'Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.',100,true,true,true,true,true,true,true,'https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg',1),
(0,'STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ',1,1,2,1,'Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.',200,true,true,true,true,true,true,true,'https://airbnbnew.cybersoft.edu.vn/images/phong2.jpg',1);

INSERT INTO book_room VALUES
(0,1,'2023-07-10','2023-07-14',1,2);

INSERT INTO comment VALUES
(0,1,2,'2023-07-02','Phòng đẹp',5);











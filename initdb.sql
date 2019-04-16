create table IF NOT EXISTS posts (id int NOT NULL AUTO_INCREMENT primary key, date datetime, user_id int, content varchar(10000), title varchar(100));
create table IF NOT EXISTS user (id int NOT NULL AUTO_INCREMENT primary key, username varchar(100), password varchar(1000));

create database blog;
create table posts (id int NOT NULL AUTO_INCREMENT primary key, date datetime, user_id int, content varchar(10000), title varchar(100));

DROP DATABASE IF EXISTS herkkutemppeli;
CREATE DATABASE herkkutemppeli;
USE herkkutemppeli;

-- create tables
CREATE TABLE User_level (
  user_level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_level_name VARCHAR(255) NOT NULL
);

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fullname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phonenumber VARCHAR(255) NOT NULL UNIQUE,
  profile_picture VARCHAR(255) NOT NULL,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_level_id) REFERENCES User_level(user_level_id)
);

CREATE TABLE Products (
  product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  product_description TEXT NOT NULL,
  product_image VARCHAR(255) NOT NULL,
  product_category_id INT NOT NULL,
  product_allergens VARCHAR(255),
  product_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Coupons (
  coupon_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  coupon_discount DECIMAL(10,2) NOT NULL,
  coupon_expiration_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- insert data
INSERT INTO User_level (user_level_name) 
  VALUES ('User'), ('Admin'), ('Banned');

INSERT INTO Users (fullname, password, email, phonenumber, profile_picture, user_level_id) 
  VALUES ('Kamilla Karenius', 'Salasana90', 'kami@metro.fi', '234 5677890', 'profilepic.png', 1);

INSERT INTO Products (product_name, product_description, product_image, product_category_id, product_allergens, product_price) 
  VALUES ('Sliced Chicken Salad', 'Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.', 'chickenSalad.jpg', 1, 'G, L, M, P, E, S', 13.90);
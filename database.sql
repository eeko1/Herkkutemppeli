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

CREATE TABLE Orders (
  order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- insert data
INSERT INTO User_level (user_level_name) 
  VALUES ('User'), ('Admin'), ('Banned');

-- Insert data into Users table
INSERT INTO Users (fullname, password, email, phonenumber, profile_picture, user_level_id)
VALUES
('Eeko', 'testisalis123', 'eemi@metris.fi', '123456789', 'kuvani.jpg', 1),
('KamiKa', 'salistesti123', 'KamiKa@metris.fi', '987654321', 'photo.jpg', 2),
('JamiNa', 'lolitesti555', 'jamina@geemail.fi', '555555555', 'jane.jpg', 2);

-- Insert data into Products table
INSERT INTO Products (product_name, product_description, product_image, product_category_id, product_allergens, product_price)
VALUES
('Bagel', 'Bagel tai Bägel.', 'bagel.jpg', 1, 'Allergen A, Allergen B', 19.99),
('Salaatti', 'Salaatti kanalla tai kalalla.', 'salad.jpg', 2, 'Allergen C', 29.99),
('Juoma', 'Kylmä juoma!', 'drink.jpg', 1, 'No Allergens', 9.99);

-- Insert data into Orders table
INSERT INTO Orders (user_id, product_id, quantity, order_date)
VALUES
(2, 1, 2, '2023-11-10 12:34:56'),
(3, 2, 1, '2023-11-11 09:45:23'),
(2, 3, 3, '2023-11-12 15:22:11');
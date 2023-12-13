<h1>
    Herkkutemppeli
</h1>
<img align="right" width="100" height="100" src="./public/image/herkkutemppeli.png">

## Introduction 
Project done for Metropolia Web Development Project course. It is a website for cafeteria named Herkkutemppeli. There customers can order, view products, and see the locations of the cafes. Employees can manage orders and modify products on the page.


## Technologies
HTML, CSS, JavaScript, TypeScript
Node.js, Express.js
MySQL2



##  Setup

1. Clone the files
 
```bash
git clone https://github.com/eeko1/Herkkutemppeli.git
```


## Database installation

2. Download [Mariadb](https://mariadb.org/) . When the Mariadb client is ready, copy this SQL database creation script to the terminal.

```SQL
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
  product_name VARCHAR(255) NOT NULL UNIQUE,
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
  user_id INT,
  status VARCHAR(255) NOT NULL DEFAULT 'pending',
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ticket (
  ticket_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
```

## Create .env file

3. Create a .env file containing your information

- DB_HOST = localhost
- DB_USER = your username
- DB_PASSWORD = your password
- DB_DATABASE = herkkutemppeli

## Installing Node.js

4. Install node.js and all the necessary dependencies

```bash
npm install
```

## Running the website

5. Run the website by using command on terminal.

```bash
npm run dev
```

## Contact

Collaborators’ GitHub accounts:
- [KamillaKa](https://github.com/KamillaKa) - Kamilla Karenius
- [eeko1](https://github.com/eeko1) - Eemi Korhonen
- [Jambolul](https://github.com/Jambolul) - Jami Näätänen

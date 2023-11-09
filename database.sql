-- create tables
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE Products (
    product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    product_category_id INT NOT NULL,
    product_allergens VARCHAR(255),
    product_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL
);


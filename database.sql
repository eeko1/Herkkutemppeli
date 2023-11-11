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
('Admin User', 'adminpassword', 'admin@example.com', '123456789', 'admin.jpg', 1),
('John Doe', 'userpassword', 'john@example.com', '987654321', 'john.jpg', 2),
('Jane Doe', 'userpassword', 'jane@example.com', '555555555', 'jane.jpg', 2);

-- Insert data into Products table
INSERT INTO Products (product_name, product_description, product_image, product_category_id, product_allergens, product_price)
VALUES
('Sliced Chicken Salad', 'Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.', 'chickenSalad.jpg', 1, 'G, L, M, P, E, S', 10.90),
('Italian Salad', 'A delightful blend of fresh lettuce, cucumbers, black olives, and feta cheese, drizzled with balsamic vinaigrette, capturing the essence of Italy.', 'italianSalad.jpeg', 1, 'L, M, P, S', 11.90),
('Tuna Salad with Egg', 'A protein-packed delight featuring flaky tuna, boiled eggs, and a medley of crunchy vegetables, all harmonized with creamy mayonnaise dressing.', 'tunaSaladWithEgg.jpg', 1, 'G, L, M, P, S', 11.20),
('Mozzarella Salad', 'Creamy mozzarella cheese paired with ripe tomatoes, basil leaves, and a drizzle of olive oil, creating a simple yet exquisite Italian-inspired salad.', 'mozzarellaSalad.jpg', 1, 'G, L, P, S, K', 13.90),
('Asian Salad', 'Vibrant and full of flavors, this salad combines crispy greens, colorful bell peppers, mandarin oranges, and a tangy sesame ginger dressing, offering a taste of the Far East.', 'asianSalad.jpg', 1, 'G, L, V, K', 13.40),
('Breakfast Bagel', 'Start your day right with our hearty breakfast bagel, loaded with scrambled eggs and your choice of bacon, sausage, or vegetables, served on a freshly baked bagel.', 'breakfastBagel.jpg', 2, 'P, S', 10.20),
('Salmon Bagel', 'Indulge in the perfect blend of smoked salmon, cream cheese, and capers, nestled in a soft and chewy bagel.', 'salmonBagel.jpg', 2, 'L, M, P, E, S', 9.80),
('Hamburger Bagel', 'A unique twist on a classic favorite, our hamburger bagel features a juicy patty, fresh lettuce, tomato, and your choice of toppings, all between two bagel halves.', 'hamburgerBagel.jpg', 2, 'L, P, S', 9.40),
('Bacon Avocado Bagel', 'A mouthwatering fusion of crispy bacon, creamy avocado slices, and fresh greens, all nestled within a warm and chewy bagel, creating a delightful blend of flavors and textures.', 'baconAvocadoBagel.jpg', 2, 'L, P, S', 9.50),
('Green Lover Bagel', 'A fresh and healthy delight, this bagel is adorned with avocado, spinach, cucumber, and a drizzle of zesty herb dressing.', 'greenloverBagel.jpg', 2, 'G, L, M, P, E, S, V, K' 8.20),
('Breakfast Croissant', 'A perfect morning treat, our buttery croissant is filled with fluffy scrambled eggs and your choice of crispy bacon or savory sausage.', 'breakfastCroissant.jpeg', 3, 'M, P, S,', 7.90),
('Ham and Cheese Croissant', 'Indulge in the savory goodness of sliced ham and melted cheese, all enveloped in a golden croissant for a satisfying meal any time of day.', 'hamAndCheeseCroissant.jpg', 3, 'L, P, E, S,', 6.90),
('Tomato, Arugula, and Mozzarella Croissant', 'Experience the harmony of flavors with sliced tomatoes, peppery arugula, and creamy mozzarella, hugged by a freshly baked croissant.', 'tomatoRucolaMozzarellaCroissant.jpg', 3, 'L, P, E, S, K', 8.60),
('Prosciutto Tomato Croissant', 'A taste of Italy in every bite, this croissant is layered with delicate prosciutto, juicy tomatoes, and a hint of basil, offering a savory delight.', 'prociuttoTomatoCroissant.jpg', 3, 'L, M, P, E, S,', 9.10),
('Banana Chocolate Croissant', 'Sweet and satisfying, our croissant is filled with ripe bananas and rich chocolate, creating a decadent pastry perfect for dessert or brunch.', 'bananaChocolateCroissant.jpg', 3, 'L, P, E, S, K', 6.20),
('Raspberry Cream Croissant', 'A delightful blend of tart raspberries and luscious cream nestled within a flaky croissant, making it a heavenly treat for your taste buds.', 'raspberryCreamCroissant.jpeg', 3, 'L, P, E, S, K', 7.30),
('Chocolate Chip Muffin', 'Satisfy your sweet tooth with our moist and fluffy muffin studded with rich chocolate chips.', 'chocolateChipMuffin.jpg', 4, 'L, P, E, K, V', 4.20),
('Chocolate Muffin', "Dive into the decadence of our double chocolate muffin, a cocoa lover's dream come true.", 'chocolateMuffin.jpg', 4, 'L, P, E, K, V', 4.30),
('Vanilla Muffin', 'Delicate and aromatic, our vanilla muffin is a light and airy treat with a hint of vanilla bean.', 'vanillaMuffin.jpg', 4, 'L, P, K', 3.70),
('Blueberry Muffin', 'Satisfy your sweet tooth with our moist and fluffy muffin studded with rich chocolate chips.', 'blueberryMuffin.jpg', 4, 'L, P, K', 3.90),
('Lemon Muffin', 'Zesty and refreshing, our lemon muffin is a citrusy sensation that brightens your day.', 'lemonMuffin.jpg', 4, 'L, P, K', 3.80),
('Cinnamon Muffin', 'Warm and inviting, our cinnamon muffin is a comforting blend of sweet and spicy flavors.', 'cinnamonMuffin.jpeg', 4, 'L, P, E, K, V', 3.90),
('Pink Donut', 'A playful and sweet delight, our pink donut is coated in a vibrant pink glaze and sprinkled with love.', 'pinkDonut.png', 5, 'L, M, P, K', 2.30),
('Chocolate Donut', 'Rich and indulgent, our chocolate donut is a classic favorite, drizzled with a glossy chocolate glaze.', 'chocolateDonut.jpg', 5, 'L, P, K', 2.50),
('Strawberry Donut', 'A playful and sweet delight, our pink donut is coated in a vibrant pink glaze and sprinkled with love.', 'strawberryDonut.jpg', 5, 'L, M, P, E, K, V', 2.40),
('Blue Donut', 'Dive into a sea of flavor with our blueberry-infused donut, covered in a blueberry glaze.', 'blueDonut.jpeg', 5, 'L, M, P, K', 2.50),
('Lemon Donut', 'Brighten your day with our zesty lemon donut, topped with a tangy lemon glaze.', 'lemonDonut.jpg', 5, 'L, M, E, P, K', 2.35),
('Vanilla Donut', 'A timeless classic, our vanilla donut is simplicity at its finest, with a sweet vanilla glaze.', 'vanillaDonut.jpg', 5, 'L, P, K', 2.50),
('Sugar Donut', 'A classic delight, our sugar donut is a sweet and satisfying treat with a light, sugary coating.', 'sugaraDonut.jpeg', 5, 'L, M, P, E, K, V', 2.30),
('Cafe Latte', 'Indulge in the perfect blend of smooth espresso and steamed milk, topped with a creamy foam.', 'cafelatte.jpg', 6, 'L, M, P, E, K, V', 2.30),


-- Insert data into Orders table
INSERT INTO Orders (user_id, product_id, quantity, order_date)
VALUES
(2, 1, 2, '2023-11-10 12:34:56'),
(3, 2, 1, '2023-11-11 09:45:23'),
(2, 3, 3, '2023-11-12 15:22:11');
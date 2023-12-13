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

-- insert data
INSERT INTO User_level (user_level_name) 
  VALUES ('User'), ('Admin'), ('Banned');

-- Insert data into Users table
INSERT INTO Users (fullname, password, email, phonenumber, profile_picture, user_level_id)
VALUES
('Admin', '$2a$04$7thAGsE7yyuqIRxDasU4Be8.02TSKUGSp/AKTRQz5/NRPxmxCIUbK', 'admin@example.com', '123456789', 'admin.jpg', 2);

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
('Green Lover Bagel', 'A fresh and healthy delight, this bagel is adorned with avocado, spinach, cucumber, and a drizzle of zesty herb dressing.', 'greenloverBagel.jpg', 2, 'G, L, M, P, E, S, V, K', 8.20),
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
('Sugar Donut', 'A classic delight, our sugar donut is a sweet and satisfying treat with a light, sugary coating.', 'sugarDonut.jpeg', 5, 'L, M, P, E, K, V', 2.30),
('Cafe Latte', 'Indulge in the perfect blend of smooth espresso and steamed milk, topped with a creamy foam.', 'cafelatte.jpg', 6, 'G, L, P, E, K', 3.70),
('Cappuccino', 'Experience the rich and robust flavor of espresso combined with velvety steamed milk and a frothy foam topping.', 'cappuccino.jpg', 6, 'G, L, P, E, K', 3.70),
('Flat White', 'A harmonious balance of espresso and silky steamed milk, offering a milder coffee experience with a velvety texture.', 'flatwhite.png', 6, 'G, L, P, E, K', 3.70),
('Matcha Latte', 'Experience the serene harmony of finely ground green tea leaves and steamed milk, brought to life in our soothing Matcha Latte.', 'matchalatte.jpg', 6, 'G, M, L, P, E, K, V', 3.70),
('Americano', 'For a bold and straightforward coffee, try our Americano, made with a shot of espresso and hot water.', 'americano.jpg', 6, 'G, L, M, P, E, K, V', 2.50),
('House Coffee', "Our house blend coffee is a comforting and aromatic brew that's perfect any time of day.", 'housecoffee.jpeg', 6, 'G, L, M, P, E, K, V', 2.50),
('Hot Chocolate', 'A cozy classic, our hot chocolate is a rich and creamy cocoa indulgence, topped with whipped cream.', 'hotchocolate.jpg', 6, 'G, L, P, E, K', 3.70),
('Espresso', "Pure and powerful, our espresso is a shot of intense coffee flavor that's sure to awaken your senses.", 'espresso.jpg', 6, 'G, L, M, P, E, K, V', 2.90),
('Cafe Macchiato', 'A shot of espresso "stained" with a dollop of frothy milk, creating a bittersweet delight.', 'macchiato.jpg', 6, 'G, L, P, E, K', 3.00),
('Iced Coffee', 'Cool down with our refreshing iced coffee, brewed to perfection and served over ice.', 'icedcoffee.jpg', 6, 'G, L, P, E, K', 3.60),
('Frapino', 'A delightful blend of coffee and ice, our Frapino is a creamy and icy treat with various flavors to choose from.', 'frapino.jpg', 6, 'G, L, P, E, K', 4.20),
('Chai Latte', 'Warm up your senses with our aromatic Chai Latte, a perfect blend of rich black tea, aromatic spices, and creamy steamed milk.', 'chailatte.jpeg', 6, 'G, L, P, E, K', 3.20),
('Tea', 'A comforting and aromatic beverage known for its versatility and soothing qualities.', 'tea.jpg', 6, 'G, L, M, P, E, K, V', 2.20),
('Breakfast Smoothie', 'Jumpstart your day with our nutritious breakfast smoothie, packed with fruits, yogurt, and a hint of honey.', 'breakfastSmoothie.jpg', 6, 'L, P, E, K', 5.60),
('Red Smoothie', 'A vibrant blend of red berries and fruits, our red smoothie is a refreshing burst of fruity goodness.', 'redSmoothie.jpg', 6, 'G, L, P, E, K', 5.40),
('Orange Smoothie', "Bright and citrusy, our orange smoothie is a tangy delight that's both delicious and invigorating.", 'orangeSmoothie.jpg', 6, 'L, P, E, K', 5.40),
('Tropical Smoothie', 'Escape to the tropics with our tropical smoothie, a blend of exotic fruits and coconut milk.', 'tropicalSmoothie.jpg', 6, 'L, P, E, K', 5.40),
('Green Smoothie', 'A nutritious powerhouse, our green smoothie is packed with leafy greens, fruits, and a touch of honey.', 'greenSmoothie.jpg', 6, 'G, L, M, P, E, K, V', 5.20),
('Blueberry Smoothie', 'A refreshing blend of ripe blueberries, creamy yogurt, and a hint of honey, creating a burst of fruity goodness in every sip.', 'blueberrySmoothie.jpg', 6, 'L, P, E, K', 5.40),
('Mango Smoothie', 'Indulge in the sweet and tropical flavor of ripe mangoes in our creamy mango smoothie.', 'mangoSmoothie.jpg', 6, 'L, P, E, K', 5.40),
('Mango Raspberry Smoothie', 'A delightful combination of juicy mangoes and tangy raspberries, creating a harmonious fruit fusion.', 'mangoRaspberrySmoothie.jpg', 6, 'L, P, E, K', 5.50),
('Orange Juice', 'Start your day with a burst of vitamin C in our fresh and zesty orange juice.', 'orangeJuice.jpeg', 6, 'G, L, M, P, E, K, V', 1.80),
('Apple Juice', 'Crisp and refreshing, our apple juice is a timeless favorite for all ages.', 'appleJuice.jpg', 6, 'G, L, M, P, E, K, V', 1.80),
('Strawberry Juice', 'Enjoy the natural sweetness of ripe strawberries in our delicious strawberry juice.', 'strawberryJuice.jpg', 6, 'G, L, M, P, E, K, V', 1.80),
('Cranberry Juice', 'A tart and tangy delight, our cranberry juice is both refreshing and invigorating.', 'cranberryJuice.jpg', 6, 'G, L, M, P, E, K, V', 2.00),
('Green Juice', 'Rejuvenate with our nutrient-packed green juice, featuring a blend of leafy greens and refreshing cucumbers.', 'greenJuice.jpg', 6, 'G, L, M, P, E, K, V', 1.80),
('NOCCO', 'A popular choice for fitness enthusiasts, our NOCCO offers a sugar-free and lightly carbonated energy boost with various flavors.', 'nocco.png', 6, 'G, L, M, P, E, K, V', 4.20),
('Pepsi', 'The classic cola favorite, our Pepsi is a fizzy and refreshing choice.', 'pepsi.jpeg', 6, 'G, L, M, P, E, K, V', 3.90),
('Pepsi Max', 'For those seeking the same great Pepsi taste with zero sugar, try our Pepsi Max.', 'pepsimax.jpeg', 6, 'G, L, M, P, E, K, V', 3.90),
('Jaffa', 'Indulge in the unique combination of orange and chocolate flavors with our Jaffa soda.', 'jaffa.jpg', 6, 'G, L, M, P, E, K, V', 3.90),
('Moomin Soda', 'Quench your thirst with a whimsical twist by sipping on our Moomin-themed soda', 'muumilimppa.png', 6, 'G, L, M, P, E, K, V', 3.70),
('Smurf Soda', 'Dive into the nostalgia of your favorite blue characters with our delightful Smurf-themed soda.', 'smurffilimppa.png', 6, 'G, L, M, P, E, K, V', 3.70),
('Sparkling Water', 'For a crisp and refreshing sip, enjoy our sparkling water, perfect for cleansing your palate.', 'sparklingwater.jpg', 6, 'G, L, M, P, E, K, V', 1.60),
('Water', 'Stay hydrated with a refreshing glass of pure water, the essential choice for quenching your thirst.', 'water.jpeg', 6, 'G, L, M, P, E, K, V', 0.00);



-- Insert data into Orders table
/* INSERT INTO Orders (user_id, order_id, order_date)
VALUES
(2, 1, '2023-11-10 12:34:56'),
(3, 2, '2023-11-11 09:45:23'),
(2, 3, '2023-11-12 15:22:11'); */
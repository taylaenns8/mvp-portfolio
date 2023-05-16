INSERT INTO users (name, email, password) VALUES ('Tayla', 'taylaenns8@gmail.com', 'password');
INSERT INTO users (name, email, password) VALUES ('John', 'johndoe@example.com', 'drowssap');

INSERT INTO portfolio_items (title, description) VALUES ('Software Engineer', 'Welcome to my test data!! I am upcoming full stack software engineer, I have experience developing web applications from end to end. I specialize in using modern web technologies such as React.js, Node.js, and postgreSQL. My portfolio **will soon** showcase projects that I have built, demonstrating my proficiency in these technologies and my ability to deliver high-quality software solutions.');

-- SELECT portfolio_items.*, users.email
-- FROM portfolio_items
-- JOIN users ON portfolio_items.user_id = users.id;

UPDATE portfolio_items
SET user_id = 1
WHERE id = 1;
INSERT INTO portfolio_items (title, description) VALUES ('Under Water Basket Weaver', 'Yes my job exists');

-- INSERT INTO users (name, email, password) VALUES ('Jane', '.com', 'password');
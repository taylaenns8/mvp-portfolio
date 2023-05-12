DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS portfolio_items;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL, 
    password TEXT NOT NULL
);
CREATE TABLE portfolio_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);


-- CREATE INDEX idx_user_id ON portfolio_items(user_id);
-- CREATE INDEX idx_deleted_at ON portfolio_items(deleted_at);

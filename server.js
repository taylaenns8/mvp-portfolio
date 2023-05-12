import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000



const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // connectionString: "postgres://postgres:postgres@localhost/users"
});

app.use(express.static('public'));
app.use(express.json());


app.get("/api/login", (_, res) => {
 db.query('SELECT * FROM users').then((data) => {
  res.json(data.rows);
 });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database to see if the email and password match
  db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
    .then(result => {
      if (result.rows.length > 0) {
        console.log('User exists');
        res.send({ success: true });
        // res.send(`{"message": "User exists"}`);
      } else {
        console.log('User does not exist');
        res.send({ success: false });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error querying database');
    });
});

app.get("/api/portfolio", (_, res) => {
  db.query('SELECT * FROM portfolio_items').then((data) => {
   res.json(data.rows);
  });
 });
 
 app.get('/api/portfolio', (req, res) => {
  const userId = req.user.id; 
  const query = `SELECT * FROM portfolio_items WHERE user_id = $1`;
  const values = [userId];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.json(result.rows);
  });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});


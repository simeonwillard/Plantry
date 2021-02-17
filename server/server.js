const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const edamamApiRouter = require('./routes/edamam.api.router');
const favoritesRouter = require('./routes/favorites.router');
const pantryRouter = require('./routes/pantry.router');
const groceryRouter = require('./routes/grocery.router');
const categoryRouter = require('./routes/category.router');
const groceryToPantryRouter = require('./routes/groceryToPantry.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/edamam', edamamApiRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/pantry', pantryRouter);
app.use('/api/grocery', groceryRouter);
app.use('/api/category', categoryRouter);
app.use('/api/grocery-to-pantry', groceryToPantryRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

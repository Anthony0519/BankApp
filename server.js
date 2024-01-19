const express = require('express');
require('./config/config');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRouter = require('./routers/userRouter');
const bettingRouter = require('./routers/bettingRoute');
const airtimeRouter = require('./routers/airtimeRouter');
const depositeRouter = require('./routers/depositeRoute');
const electronicsRouter = require('./routers/electronicsRoute');
const historyRouter = require('./routers/historyRoute');
const msgRouter = require('./routers/msgRouter');
const transferRouter = require('./routers/transferRoute');
const withdrawRouter = require('./routers/withdrawRoute');

app.use(cors());
app.use(express.json());


app.use('/api/v1', userRouter);
app.use('/api/v1', bettingRouter)
app.use('/api/v1', depositeRouter)
app.use('/api/v1', bettingRouter)
app.use('/api/v1', airtimeRouter)
app.use('/api/v1', historyRouter)
app.use('/api/v1', msgRouter)
app.use('/api/v1', transferRouter)
app.use('/api/v1', electronicsRouter)
app.use('/api/v1', withdrawRouter)
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
    res.send('Welcome to your API!');
  });

const port = process.env.port;

app.listen(port, () => {
  console.log(`This server is listening on port: ${port}`);
});

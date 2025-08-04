const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8001;

const { restrictToLoggedinUserOnly, checkAuth } = require('./middleware/auth')
const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const { connectDB } = require('./connect');

const URL = require('./models/url');

connectDB('mongodb://localhost:27017/short-url');

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRouter);


app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, 
        { $push: { visitHistory:  {timeStamp: Date.now()} } },
    )
    return res.redirect(entry.redirectURL);
    })


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

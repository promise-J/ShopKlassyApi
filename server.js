const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const expImg = require("express-fileupload")
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000
const path = require('path')

const app = express()


app.use(cors({
    origin: true,
    credentials: true,
    // origin: "http://localhost:3000"
    
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
    expImg({
      useTempFiles: true,
    })
  );

app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // proxy: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "usersessions",
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain: 'mydomain.com',
        // httpOnly: true,
        secure: true,
        sameSite: "none"
    }
}))




app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/imgRoute'))
// app.use('/cart', require('./routes/cart'))
app.use('/product', require('./routes/product'))
app.use('/user', require('./routes/user'))
app.use('/order', require('./routes/order'))
app.use('/payment', require('./routes/stripe'))


app.listen(PORT, ()=>{
    console.log(`Server running at Port ${PORT}`)
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('MongoDB connected to ' + process.env.MONGO_URL ))
    .catch((err)=> console.log(err))
})




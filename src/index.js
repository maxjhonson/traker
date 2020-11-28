require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/TrackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
 
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri='mongodb+srv://admin:8095987482@cluster0.n0sxr.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
})

mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongo instance')
})

mongoose.connection.on('error', err=>{
    console.error('Error connection to mongo', err);
})


app.get('/',requireAuth, (req, res)=>{
    res.send(`Your email: ${req.user.email}`)
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("listening on port 3000")
})

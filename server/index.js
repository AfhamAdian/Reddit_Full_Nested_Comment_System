const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3001, () => { console.log('Server is running on port 3001') });

app.get('/', (req,res)=>{
    res.send('Hello World');
})

const PostRouter = require('./routes/postRouter');
app.use('/api/v1', PostRouter);



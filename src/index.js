import express from 'express';

import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import socket from './socket/socket'
import searchUser from './routes/searchUser';

const app = express();
 
socket()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/search-user', searchUser)

app.listen(process.env.PORT_SERVER || 4000);
console.log(`server started at http://localhost:${process.env.PORT_SERVER || 4000}`);
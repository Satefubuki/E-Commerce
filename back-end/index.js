const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const {ErrorResult} = require('./utils/base_response');

app.use(cors({
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

// const auth = require('./middleware/auth');
// app.use(auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userCtrl = require('./controllers/users');
app.use('/users', userCtrl);

const storyTypeCtrl = require('./controllers/story-types');
app.use('/storytypes', storyTypeCtrl);

const storyCtrl = require('./controllers/stories');
app.use('/stories', storyCtrl);

const chapterCtrl = require('./controllers/chapters');
app.use('/chapters', chapterCtrl);

const chapterContentCtrl = require('./controllers/chapter-contents');
app.use('/chapter-content', chapterContentCtrl);

const purchasedchapterCtrl = require('./controllers/purchased-chapters');
app.use('/purcharsed-chapter', purchasedchapterCtrl);


app.use((req, res) => {
    res.status(404).json(ErrorResult(404, 'API not found!'));
});

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);
});
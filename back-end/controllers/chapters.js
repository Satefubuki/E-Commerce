const express = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const Op = sequelize.Op;
const { Chapter } = require('../models/db');
const { ErrorResult, Result, PagingResult } = require('../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    //phan quyen o day
    next();
});

router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';

    let sortColumn = 'chapname';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }

    const offset = page * pageSize;
    // const limit = parseInt(offset) + parseInt(pageSize);
    const limit = pageSize;

    if (queryString.length <= 2) {
        Chapter.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Chapter.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit
            }).then(stories => {
                return res.json(PagingResult(stories, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    } else { // search
        // conditions
        const whereClause = {
            [Op.or]: [
                { storyname: { [Op.like]: queryString } },
                { description: { [Op.like]: queryString } },
                { copyright: { [Op.like]: queryString } }
            ]
        }

        Chapter.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Chapter.findAll({
                where: whereClause,
                offset: offset,
                limit: limit
            }).then(stories => {
                return res.json(PagingResult(stories, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
});

router.get('/getStoryChapters/:storyId', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';

    let sortColumn = 'chapname';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }

    const offset = page * pageSize;
    // const limit = parseInt(offset) + parseInt(pageSize);
    const limit = pageSize;

    if (queryString.length <= 2) {
        // conditions
        const whereClause = {
            storyid: req.params.storyId
        }

        Chapter.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Chapter.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit
                // include: [{ model: Story, as: 'story' }]
            }).then(chapters => {
                return res.json(PagingResult(chapters, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    } else { // search
        // conditions
        const whereClause = {
            storyid: req.params.storyId,
            [Op.or]: [
                { chapname: { [Op.like]: queryString } },
                { postdata: { [Op.like]: queryString } },
                { coin: { [Op.like]: queryString } },
                { chapstatus: { [Op.like]: queryString } }
            ]
        }

        Chapter.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Chapter.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [{ model: Story, as: 'story' }]
            }).then(chapters => {
                return res.json(PagingResult(chapters, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
})

router.post('/', (req, res) => {
    Chapter.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(400).json(ErrorResult(404, err.errors));
    });
});

router.put('/:id', (req, res) => {
    Chapter.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                chapname: req.body.chapname,
                postdata: req.body.postdata,
                coin: req.body.coin,
                chapstatus: req.body.chapstatus
            }).then(type => {
                res.json(type);
            }).catch(err => {
                return res.status(400).send(err.errors);
            });
        } else {
            res.status(404).send('Not Found');
        }
    });
});

router.get('/:id(\\d+)', (req, res) => {
    Chapter.findByPk(req.params.id).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.delete('/:id', (req, res) => {
    Chapter.destroy({
        where: {
            id: req.params.id
        }
    }).then(type => {
        res.json(type);
    }).catch(err => {
        return res.status(500).send(err.errors);
    });
});

module.exports = router;
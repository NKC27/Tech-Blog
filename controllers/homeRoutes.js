const router = require('express').Router();
const {
    Post,
    Comment,
    User
} = require('../models');
const withAuth = require('../utils/auth');

// All posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }, ],
        });

        const posts = postData.map((post) => post.get({
            plain: true
        }));
        console.log('Posts Homepage', posts)
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['username'],
                },
            ],
        });

        const post = postData.get({
            plain: true
        });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If already logged in, redirect to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
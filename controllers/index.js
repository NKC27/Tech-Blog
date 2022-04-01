const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboardRoutes', dashboardRoutes);

module.exports = router;
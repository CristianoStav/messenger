exports.notFound = (req, res, next) => {
    res.status(404).render('err/404');
};

exports.default = (error, req, res, next) => {
    res.status(500).render('err/default', { error });
};
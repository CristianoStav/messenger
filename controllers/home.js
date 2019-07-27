module.exports = (app) => {
    const HomeController = {
        index: (req, res) => {
            res.render('home/index');
        },
        login: (req, res) => {
            const { usuario } = req.body;
            const { nome, email } = usuario;

            if (email && nome) {
                usuario.contatos = [];
                req.session.usuario = usuario;
                res.status(200).redirect('/contatos');
            } else {
                res.status(500).redirect('/');
            }
        },
        logout: (req, res) => {
            req.session.destroy();
            res.redirect('/');
        }
    };

    return HomeController;
};

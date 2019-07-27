module.exports = (app) => {
    const ContatosController = {
        index: (req, res) => {
            const { usuario } = req.session;
            const { contatos } = usuario;

            res.status(200).render('contatos/index', { usuario, contatos });
        },

        create: (req, res) => {
            const { usuario } = req.session;
            const { contato } = req.body;

            usuario.contatos.push(contato);
            res.status(201).redirect('/contatos');
        },

        show: (req, res) => {
            const { id } = req.params;
            const { usuario } = req.session;
            const contato = usuario.contatos[id];

            res.status(302).render('contatos/show', { id, contato, usuario });
        },

        edit: (req, res) => {
            const { id } = req.params;
            const { usuario } = req.session;
            const contato = usuario.contatos[id];

            res.status(302).render('contatos/edit', { id, contato, usuario });
        },

        update: (req, res) => {
            const { contato } = req.body;
            const { usuario } = req.session;
            const { id } = req.params;

            usuario.contatos[id] = contato;
            res.status(200).redirect('/contatos');
        },

        destroy: (req, res) => {
            const { id } = req.params;
            const { usuario } = req.session;

            usuario.contatos.splice(id, 1);
            res.status(204).redirect('/contatos');
        }
    };

    return ContatosController;
};
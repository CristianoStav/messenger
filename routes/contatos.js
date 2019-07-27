const auth = require('../middlewares/authenticator');

module.exports = (app) => {
    const { contatos } = app.controllers;

    app.get('/contatos', auth, contatos.index);
    app.get('/contato/:id', auth, contatos.show);
    app.post('/contato', auth, contatos.create);
    app.get('/contato/:id/editar', auth, contatos.edit);
    app.put('/contato/:id', auth, contatos.update);
    app.delete('/contato/:id', auth, contatos.destroy);

};
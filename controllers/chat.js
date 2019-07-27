module.exports = (app) => {
    const ChatController = {
        index: (req, res) => {
            const { usuario } = req.session;
            res.status(200).render('chat/index', { usuario });
        }
    };

    return ChatController;
};
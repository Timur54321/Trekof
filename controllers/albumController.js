const Album = require("../models/albumModel")

exports.createOne = async (req, res) => {
    try {
        // 1. Извлекаем нужные данные из req.body
        const { name, mediafiles = [], cover } = req.body;

        // 2. Валидация обязательных полей (если middleware не обработал)
        if (!name || !cover) {
            return res.status(400).json({
                status: 'fail',
                message: 'Не указано имя альбома, исполнитель или обложка'
            });
        }

        // 3. Создаем новый альбом
        const newAlbum = await Album.create({
            name,
            artist: res.locals.user._id,
            mediafiles: Array.isArray(mediafiles) ? mediafiles : [mediafiles],
            cover
        });

        // 4. Отправляем успешный ответ с созданным альбомом
        res.status(201).json({
            status: 'success',
            data: {
                album: newAlbum
            }
        });

    } catch (err) {
        // Обработка ошибок Mongoose (например, невалидный ObjectId)
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getArtistAlbums = async (req, res) => {
    const albums = await Album.find({artist: req.params.key});

    res.status(200).json(albums);
};

exports.deleteOne = async (req, res) => {
    const album = await Album.findByIdAndDelete(req.params.key);

    res.status(203).json('deleted');
}

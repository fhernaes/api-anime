const express = require('express');
const router = express.Router();
const fs = require('fs');

// Rutas-------------------------
let animeData = require('./anime.json');
fs.readFile('./anime.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        animeData = {};
    } else {
        animeData = JSON.parse(data);
    }
});

router.get('/', (req, res) => {
    res.json(animeData);
});

router.get('/:id', (req, res) => {
    const anime = animeData[req.params.id];
    if (anime) {
        res.json(anime);
    } else {
        return res.status(404).json({ msg: `No existe anime con el id ${req.params.id}` });
    }
});

router.get('/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const anime = Object.values(animeData).find(anime => anime.nombre.toLowerCase() === nombre);
    if (anime) {
        res.json(anime);
    } else {
        return res.status(404).json({ msg: `No existe anime con el nombre ${req.params.nombre}` });
    }
});



router.put('/:id', (req, res) => {
    const animeId = req.params.id;
    const updateAnime = req.body;
    const anime = animeData[animeId];

    if (anime) {
        anime.nombre = updateAnime.nombre || anime.nombre;
        anime.genero = updateAnime.genero || anime.genero;
        anime.año = updateAnime.año || anime.año;
        anime.autor = updateAnime.autor || anime.autor;

        fs.writeFile('anime.json', JSON.stringify(animeData), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Error al guardar el archivo JSON' });
            }
            res.json({ msg: 'Anime actualizado', anime });
        });
    } else {
        res.status(400).json({ msg: `No existe anime con el id ${animeId}` });
    }
});

router.delete('/:id', (req, res) => {
    const animeId = req.params.id;
    const anime = animeData[animeId];

    if (anime) {
        delete animeData[animeId];

        fs.writeFile('anime.json', JSON.stringify(animeData), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Error al guardar el archivo JSON' });
            }
            res.json({ msg: 'Anime eliminado', anime });
        });
    } else {
        res.status(400).json({ msg: `No existe anime con el ${animeId}` });
    }
});

module.exports = router;

const db = require('../config/database.js');
const bcrypt = require('bcrypt')

function check_validity(elem) {

    if (elem == undefined || elem.length == 0)
        return 0
    return 1
}

exports.createUrl = (req, res, next) => {
    const url = req.body.url
    const password = req.body.password

    if (check_validity(url)) {
        db.execute('INSERT INTO `url` (`id`, `url`) VALUES (NULL, ?)', [url], function (err, results, fields) {
            if (!err) {
                db.execute(' INSERT INTO `content`(`id`, `url_id`, `password`, `content`) VALUES(NULL, ?, ?, NULL);', [results.insertId, password], function (err, results, fields) {
                    if (!err) {

                        res.status(202).json({ statut: "Succesfully created" });
                    }
                    else {
                        res.status(500).json({ error: "sus" });
                    }
                })
            }
            else if (err.errno == 1062) {
                res.status(500).json({ error: "URL already used" });
                return;
            }
            else {
                res.status(500).json({ error: "cringe" });
                return;
            }
        })
    } else {
        res.status(400).json({ error: "Invalid URL name or password" });
    }
}

exports.deleteUrl = (req, res, next) => {
    const url = req.body.url
    const password = req.body.password

    if (check_validity(url) && check_validity(password)) {
        db.execute('SELECT * FROM `content` WHERE password = ?', [password], function (err, results, fields) {
            if (results && results[0]) {
                const tmp = results[0]
                db.execute('SELECT * FROM `url` WHERE id = ? AND url = ?', [tmp.url_id, url], function (err, results, fields) {
                    if (results && results[0]) {
                        const tmpb = results[0]
                        db.execute('DELETE FROM `url` WHERE `url`.`id` = ?', [tmpb.id], function (err, results, fields) {
                            if (!err) {
                                res.status(401).json({ statut: "Succesfully deleted" });
                                return;
                            }
                            else {
                                res.status(500).json({ statut: "Not allowed" });
                            }
                        })
                    }
                    else {
                        res.status(500).json({ statut: "Not allowed" });
                    }
                })
            }
            else {
                res.status(500).json({ statut: "Not allowed" });
            }
        })
    } else {
        res.status(500).json({ statut: "Not allowed" });
    }
}

exports.delete = (req, res, next) => {
    const id = req.body.id
    const code = req.body.code

    if (check_validity(id) && check_validity(code)) {
        db.execute('SELECT * FROM `actions` WHERE code = ? AND id = ?', [code, id], function (err, results, fields) {
            if (results && results[0]) {
                db.execute('DELETE FROM `actions` WHERE code = ? AND id = ?', [code, id], function (err, results, fields) {
                    if (!err) {
                        res.status(200).json({});
                    }
                    else
                        res.status(400).json([]);
                })
            } else {
                res.status(400).json([]);
            }

        })
    } else {
        res.status(400).json([]);
    }
}

exports.getUrl = (req, res, next) => {
    db.execute('SELECT * FROM url WHERE url = ?', [req.params.url], function (err, results, fields) {
        if (results && results[0]) {
            res.status(200).json(...results);
            return
        }
        else {
            res.status(404).json({ error: "Not existing" });
        }
    })
}

exports.getAllUrl = (req, res, next) => {
    db.execute('SELECT * FROM url ', function (err, results, fields) {
        if (!err) {
            res.status(200).json(results);
            return
        }
        else {
            res.status(400).json({ error: "error" });
        }
    })
}


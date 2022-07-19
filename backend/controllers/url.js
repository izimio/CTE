const db = require('../config/database.js');
const bcrypt = require('bcrypt')

function check_validity(elem) {

    if (elem == undefined || elem.length == 1)
        return 0
    return 1
}

exports.createUrl = (req, res, next) => {
    const url = req.body.url
    const password = req.body.password

    if (check_validity(url)) {
        db.execute('INSERT INTO `content` (`url`, `password`) VALUES (?, ?)', [url, password], function (err, results, fields) {
            if (!err) {
                res.status(202).json({ statut: "Succesfully created" });
            }
            else if (err.errno == 1062) {
                res.status(500).json({ error: "URL already used" });
                return;
            }
            else {
                res.status(500).json({ error: "sus" });
            }
        })
    }
    else {
        res.status(400).json({ error: "Invalid URL name or password" });
    }
}

exports.deleteUrl = (req, res, next) => {
    const url = req.body.url
    const password = req.body.password

    if (check_validity(url) && check_validity(password)) {
        db.execute('DELETE FROM `content` WHERE `url` = ? AND `password` = ?', [url, password], function (err, results, fields) {
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
        res.status(500).json({ statut: "Invalid credentials" });

    }
}



exports.modifyPassword = (req, res, next) => {
    const url = req.body.url
    const password = req.body.password
    const new_password = req.body.new_password

    if (check_validity(url) && check_validity(password), check_validity(new_password)) {
        db.execute('UPDATE `content` SET `password` = ? WHERE `url` = ? AND password = ?', [new_password, url, password], function (err, results, fields) {
            if (!err) {
                res.status(401).json({ statut: "Password succesfully modified for url : " + url });
                return;
            }
            else {
                res.status(500).json({ statut: "Not allowed" });
            }
        })
    }
    else {
        res.status(500).json({ statut: "Invalid credentials" });

    }
}

exports.modifyContent = (req, res, next) => {
    const url = req.body.url
    const password = req.body.password
    const content = req.body.content

    if (check_validity(url) && check_validity(password), check_validity(content)) {
        db.execute('UPDATE `content` SET `content` = ? WHERE `url` = ? AND password = ?', [content, url, password], function (err, results, fields) {
            if (!err) {
                res.status(401).json({ statut: "Password succesfully modified for url : " + url });
                return;
            }
            else {
                res.status(500).json({ statut: "Not allowed" });
            }
        })
    }
    else {
        res.status(500).json({ statut: "Invalid credentials" });

    }
}

exports.getUrl = (req, res, next) => {
    const password = req.body.password
    db.execute('SELECT (content) FROM content WHERE url = ? AND password = ?', [req.params.url, password], function (err, results, fields) {
        if (results && results[0]) {
            res.status(200).json(results[0]);
            return
        }
        else {
            res.status(500).json({err: "Not allowed" });
        }
    })
}

exports.checkPswd = (req, res, next) => {
    const url = req.body.url
    const password = req.body.password
    db.execute('SELECT (id) FROM content WHERE url = ? AND password = ?', [url, password], function (err, results, fields) {
        if (results && results[0]) {
            res.status(200).json(1);
        }
        else {
            res.status(200).json(0);
        }
    })
}

exports.checkUrl = (req, res, next) => {
    db.execute('SELECT (id) FROM content WHERE url = ?', [req.params.url], function (err, results, fields) {
        if (results && results[0]) {
            res.status(200).json(1);
            return
        }
        else {
            res.status(200).json(0);
        }
    })
}

exports.getAllUrl = (req, res, next) => {
    db.execute('SELECT (url) FROM content ', function (err, results, fields) {
        if (!err) {
            res.status(200).json(results);
        }
        else {
            res.status(400).json({ error: "error" });
        }
    })
}


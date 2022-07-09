var db = require('../config/database.js');

var colors = ['#B03A2E', '#6C3483', '#148F77', '#B7950B', '#AF601A', '#839192', '#2E4053', '#2E86C1', '#943126', '#BA4A00'];

colors[Math.floor(Math.random() * colors.length)];

function check_validity(elem) {

    if (elem == undefined || elem.length == 0)
        return 0
    return 1
}

exports.add = (req, res, next) => {
    const name = req.body.name
    const action = req.body.action
    const block = req.body.block
    const code = req.body.code
    const color = colors[Math.floor(Math.random() * colors.length)];

    if (check_validity(name) && check_validity(action) && check_validity(block) && check_validity(color)) {
        db.execute('SELECT * FROM `code_digit` WHERE code = (?)', [code], function (err, results, fields) {
            if (results[0]) {
                db.execute('INSERT INTO `actions` (name, color, action, block, code) VALUES (?, ?, ?, ?, ?)', [name, color, action, block, code], function (err, results, fields) {
                    if (!err) {
                        res.status(200).json({ name: name, color: color, action: action, block: block, id: results.insertId });
                    }
                    else
                        res.status(404).json([]);
                })
            } else {
                res.status(400).json([]);
            }

        })
    } else {
        res.status(400).json([]);
    }
}

exports.modify_base = (req, res, next) => {
    const name = req.body.name
    const id = req.body.id
    const code = req.body.code
    const color = req.body.color

    if (check_validity(name) && check_validity(id) && check_validity(code) && check_validity(color)) {
        db.execute('SELECT * FROM `actions` WHERE code = ? AND id = ?', [code, id], function (err, results, fields) {
            if (results && results[0]) {
                db.execute('UPDATE `actions` SET name = ?, color = ? WHERE code = ? AND id = ?', [name, color, code, id], function (err, results, fields) {
                    if (results.affectedRows != 0) {
                        res.status(200).json({});
                    }
                    else
                        res.status(404).json([]);
                })
            } else {
                res.status(400).json([]);
            }

        })
    } else {
        res.status(400).json([]);
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
    db.execute('SELECT * FROM url WHERE url = ?',[req.params.url],  function (err, results, fields) {  
        if (results[0]) {
            res.status(200).json(...results);
            return
        }
        else {
            res.status(404).json({ error: "Not existing" });
        }
    })
}

exports.getAllUrl = (req, res, next) => {
    db.execute('SELECT * FROM url ',  function (err, results, fields) {  
        if (!err) {
            res.status(200).json(results);
            return
        }
        else {
            res.status(400).json({ error: "error" });
        }
    })
}


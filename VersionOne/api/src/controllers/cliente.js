const con = require('../connection/connect');

const create = (req, res) => {
    const { nome_cliente, cpf, telefone } = req.body;
    const sql = `INSERT INTO Cliente (nome_cliente, cpf) VALUES (?, ?)`;
    con.query(sql, [nome_cliente, cpf], (err, result) => {
        if(err) {
            if(err.code == 'ER_DUP_ENTRY') {
                res.status(409).json('Ja existe um cliente com esse CPF');
            } else {
                res.status(500).json(err);
            }
        } else {
            res.status(201).json(req.body);
        }
    });

    if(telefone != null) {
        con.query('INSERT INTO Telefone (cpf, numero) VALUES (?, ?)', [cpf, telefone]);
    }
}

const read = (req, res) => {
    const sql = 'SELECT * FROM Cliente';
    con.query(sql, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
};

const update = (req, res) => {
    const { cpf } = req.params;
    const { nome_cliente, telefone } = req.body;
    const sql = `UPDATE Cliente SET nome_cliente = ? WHERE cpf = ?`;
    con.query(sql, [nome_cliente, cpf], (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(req.body);
        }
    });

    if(telefone != null) {
        const sql2 = `UPDATE Telefone SET numero = ? WHERE cpf = ?`;
        con.query(sql2, [telefone, cpf]);
    }
};

const del = (req, res) => {
    const { cpf } = req.params;
    const sql = `DELETE FROM Cliente WHERE cpf = ?`;
    con.query(sql, [cpf], (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(req.body);
        }
    });
}

module.exports = {
    create,
    read,
    update,
    del
}
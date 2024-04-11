const express = require('express');
const routes = express.Router();

const veiculo = require('./controllers/veiculo');
const cliente = require('./controllers/cliente');
const telefone = require('./controllers/telefone');
const aluguel = require('./controllers/aluguel');

routes.get( '/', (req, res) => {  
    return res.status(200).json({ message: 'API online!' });  
});

routes.get('/veiculo', veiculo.read);
routes.post('/veiculo', veiculo.create);
routes.put('/veiculo/:placa', veiculo.update);
routes.delete('/veiculo/:placa', veiculo.del);

routes.get('/cliente', cliente.read);
routes.post('/cliente', cliente.create);
routes.put('/cliente/:cpf', cliente.update);
routes.delete('/cliente/:cpf', cliente.del);

routes.get('/telefone', telefone.read);

routes.get('/aluguel', aluguel.read);
routes.post('/aluguel', aluguel.create);
routes.put('/aluguel/:id', aluguel.update);
routes.delete('/aluguel/:id', aluguel.del);

routes.get('/aluguel/reservados', aluguel.readReservados);
routes.get('/aluguel/alugados', aluguel.readAlugados);
routes.get('/aluguel/relatorio', aluguel.readRelatorio);

module.exports = routes;
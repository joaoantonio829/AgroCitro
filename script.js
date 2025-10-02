const express = require('express');
const path = require('path');
const { obterPlantio, incluirPlantio, obterTotalPlantas, obterIrrigacao, incluirIrrigacao, obterColheita, incluirColheita } = require('./repositorio/bancoDados');

const server = express();
server.use(express.json());
server.use(express.static(path.join(__dirname))); 

server.get('/plantio', async (req, res) => {
    const plantas = await obterPlantio();
    res.json(plantas);
})

server.get('/irrigacao', async (req, res) => {
    const horario = await obterIrrigacao();
    res.json(horario);
})

server.get('/colheita', async (req, res) => {
    const colher = await obterColheita();
    res.json(colher);
})

server.get('/plantas', async (req, res) =>{
    try {
        const { total_plantas, data_plantio } = await obterTotalPlantas();

        res.json({
            total_plantas: total_plantas || 0,
            data_plantio: data_plantio || null
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Não obteve" });
    }
});

server.post('/adicionar-plantio', async (req, res) => {

    const { variedade, dataPlantio, quantidade, localizacao } = req.body; 

    const resp = await incluirPlantio(variedade, dataPlantio, quantidade, localizacao); 

    if(resp.affectedRows > 0)
        {
            res.json ({msg:'Esta configurado!'});
        }
        else{
            res.json({msg:'Não esta configurado!'});
        }
})

server.post('/adicionar-irrigacao', async (req, res) => {
    const {Horario_Inicial, Horario_Final} = req.body;

    const resp = await incluirIrrigacao(Horario_Inicial, Horario_Final);

    if(resp.affectedRows > 0)
        {
            res.json ({msg:'Esta configurado!'});
        }
        else{
            res.json({msg:'Não esta configurado!'});
        }
})

server.post('/adicionar-colheita', async (req, res) => {
    const {Data_Colheita, Quantidade_Colhida, Qualidade} = req.body;

    const resp = await incluirColheita(Data_Colheita, Quantidade_Colhida, Qualidade);

    if(resp.affectedRows > 0)
        {
            res.json ({msg:'Esta configurado!'});
        }
        else{
            res.json({msg:'Não esta configurado!'});
        }
})

server.listen(3000, () => {
    console.log('Servidor online');
});
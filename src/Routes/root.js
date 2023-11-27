const userRouter  = require('./users');

const express = require('express');
const router = express.Router();

router.use('/users', userRouter);
router.use('*', (req, res)=>{
    return res.status(404).json({"mensagem":"Rota não encontrada"});
});

module.exports = router;
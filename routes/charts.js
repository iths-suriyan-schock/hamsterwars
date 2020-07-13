const { Router } = require('express');
let { db } = require('../firebase')

let router = new Router();

router.get('/top', async (req, res) => {
    
    try {
        let games = await db.collection('hamsters').orderBy('wins', "desc").limit(5).get();
        let topwins = [];
        
        games.forEach(game => {
            topwins.push(game.data())
        });
        
        res.status(200).send({ topwins: topwins })
    }
    catch(err){
        res.status(500).send(err);
    }
    
})

router.get('/bottom', async (req, res) => {
    
    try {
        let games = await db.collection('hamsters').orderBy('defeats', "desc").limit(5).get();
        let toplosses = [];
        
        games.forEach(game => {
            toplosses.push(game.data())
        });
        
        res.status(200).send({ toplosses: toplosses })
    }
    catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;
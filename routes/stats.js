const { Router } = require('express');
let { db } = require('../firebase')

let router = new Router();

router.get('/total', async (req, res) => {
    
    try {
// Create functions to show stats of total games so far
        let games = await db.collection('games').get();
        
        res.status(200).send({ totalGames: games._size })
    }
    catch(err){
        res.status(500).send(err);
    }
})

router.get('/averageAge', async (req, res) => {
    
    try {
// Create functions to show the middle age of all hamsters
        let hamsters = await db.collection('hamsters').get();
        let hamsterArr = [];

        hamsters.forEach(hamster => {
            hamsterArr.push(hamster.data().age)
        });
        hamsterArr = (hamsterArr.reduce((a, b) => a + b) / hamsterArr.length)
        res.status(200).send({ "Average age": hamsterArr })
    }
    catch(err){
        res.status(500).send(err);
    }
})

router.get('/:favFood', async (req, res) => {
    
    try {
// Create functions to show specific favorite food of hamsters
        let hamsters = await db.collection('hamsters').where("favFood", "==", req.params.favFood).get();
        let hamsterArr = [];
        
        hamsters.forEach(hamster => {
            hamsterArr.push(hamster.data())
        });
        res.status(200).send({ hamsterArr: hamsterArr })
    }
    catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;
const { Router } = require('express');
const { db } = require('./../firebase')

const router = new Router();

router.get('/', async (req, res) => {
    
    try {
        db.collection('hamsters').get().then(snapShot => {
            
            let hamsters = []
            snapShot.forEach(hamster  => {
                hamsters.push(hamster.data())
            })
            res.status(200).send({ hamsters: hamsters })
        })
    }
    catch (error) {
        res.status(500).send(err);
    }
});

router.get('/random', async (req, res) => {
    
    try {
        // Create funtions to bring forth a random hamster
        db.collection('hamsters').get().then(snapShot => {
            // console.log(snapShot);
            let hamsters = []
            snapShot.forEach(hamster  => {
                hamsters.push(hamster.data())
            })
            let rand = Math.floor(Math.random()*hamsters.length)
            res.status(200).send(hamsters[rand])
        })
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    
    try {
        // Create funtions to GET and show ID of hamsters
        let hamsters = []
        let snapShot = await db.collection('hamsters').where("id", "==", parseInt(req.params.id)).get()
        snapShot.forEach(doc => {
            hamsters.push(doc.data())
        })
        console.log(hamsters)
        res.status(200).send(hamsters[0])
    }
    catch (err) {
        res.status(500).send(err);
    }
});

//Updates hamster's wins && defeats by ID
router.put('/:id/result', async (req, res) => {

    try {
        const id = req.params.id*1;
        console.log(id);
        
        const snapshot = await db.collection('hamsters').where("id", "==", id).get();
        let hamsterID;
        let hamster;

        snapshot.forEach(element => {
            hamster = element.data() // Hamster-object from data.json is now stored in a variable
            hamsterID = element.id // Hamster-object from DB in Firebase is now stored in a variable
        })

        console.log(hamster);
        console.log(req.body);

        if (req.body.wins === 1 && req.body.defeats === 0) {
            console.log(hamsterID); //Logs the hamster-object ID-code from Firebase
            let updateWinningHamster = { 
                "wins": hamster.wins+req.body.wins*1,
                "games": hamster.games+1
            }
            await db.collection('hamsters').doc(hamsterID).update(updateWinningHamster)

        } else if (req.body.wins === 0 && req.body.defeats === 1) {
            console.log(hamsterID); //Logs the hamster-object ID-code from Firebase
            let updateLosingHamster = { 
                "defeats": hamster.defeats+req.body.defeats*1,
                "games": hamster.games+1
            }
            await db.collection('hamsters').doc(hamsterID).update(updateLosingHamster)

        } else {
            throw 'Error: Invalid Request - You must either increase wins or defeats by 1';
        }
        res.status(200).send({ msg: `Hamster with ID: ${id} has been updated` });

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;

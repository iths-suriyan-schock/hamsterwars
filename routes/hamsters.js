const { Router } = require('express');
const { db } = require('./../firebase')

const router = new Router();

router.get('/', async (req, res) => {
    
    try {
        // Create funtions to create snapshot of DB collections of hamsters (use snapShot.forEach() and then hamsters.push()
        // Create an empty array for hamsters first, a placeholder for us to use to push in the new data
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
        // Create funtions to get and show ID of hamsters
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
// /hamsters/:id/result Updates wins/defeats and games with +1 on requested hamsterobject (PUT)
// router.put('/:id([0-9]+)/result', async (req, res) => {

//     try {
        
//         // Get all hamsters with the matching id from firebase
//         let snapshot = await db
//         .collection('hamsters')
//         .where('id', '==', parseInt(req.params.id))
//         .get()

//         // Check if an object was found
//         if (snapshot.size === 0) {
                
//             res.status(400).send({ msg: 'Id does not exist'});
        
//         } else {

//             // Loop through results
//             snapshot.forEach(doc => {
                
//                 // Check that only values 0 or 1 are passed in the request body
//                 if (req.body.wins !== (1 || 0) && req.body.defeats !== (1 || 0)) {
                    
//                     res.status(400).send({msg: 'Values can only be 1 or 0.'})
                    
//                 } else {
                    
//                     // Check that the passed values are not equal
//                     if(req.body.wins !== req.body.defeats) {
                        
//                         let hamster = doc.data(); // Store firebase-object as json in variable
//                         let wins = req.body.wins;
//                         let defeats = req.body.defeats;
                        
//                         // If no value is set in body then value should be 0 (to prevent changing the db-value to null)
//                         hamster.wins += wins ? wins : 0;
//                         hamster.defeats += defeats ? defeats : 0;
//                         hamster.games += 1;
                        
//                         // Update database with new values
//                         db
//                         .collection('hamsters')
//                         .doc(doc.id)
//                         .update(hamster)
//                         .catch(err => { throw err })
                        
//                         res.status(201).send({msg: `Updated hamster ${req.params.id}`})
                        
//                     } else {
                        
//                         res.status(400).send({msg: 'Values cannot be equal'})
                        
//                     }
//                 }
//             })
//         }
//     }
//     catch (err) {

//         res.status(500).send(err);
        
//     }
// })
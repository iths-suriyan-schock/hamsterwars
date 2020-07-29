const hamsters = require('./data.json');
const { db } = require('./firebase')

console.log('Adding hamsters to DB..');

( async () => {

    for(const hamster of hamsters) {
        try {
            await db.collection('hamsters').doc().set(hamster)
        }

        catch(err) {
            console.error(err);
        }
    }
})()

console.log(hamsters.length)

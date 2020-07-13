const hamsters = require('./data.json');
const { db } = require('./firebase')

console.log('Adding hamsters to Db.');

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

// db.collection('hamsters').get().then(snapshop => {

//     let hamsters = [];
//     snapshop.forEach(hamster => {
//         hamsters.push(hamster.data())
//     })

    console.log(hamsters.length)

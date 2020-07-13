let data = require('./data.json'); 

let { db } = require('./firebase')

function setData(){
    try {
        let hamsterId = 1
        data.forEach(hamster => {
            db.collection('hamsters').doc(hamsterId.toString()).set( hamster )
            console.log(hamsterId)
            hamsterId++
        })
    }
    catch(error) {
        console.error(error)
    }
}

setData()
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://hoang9101999:hoang9101999@cluster0.hqu3d.mongodb.net/CytographyProject?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
      console.log('Connect successfully!!!');
      mongoose.set('useFindAndModify', false);
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };

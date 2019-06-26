
module.exports =function() {
    mongoose
        .connect('mongodb://localhost/jsonstore', {
            useNewUrlParser: true
        })
        .then(() => console.log('Connected to MongoDB....'))
        .catch((err) => console.error('Could not connect to MongoDb...', err));
}
const mongoose = require('mongoose')
const {
    Schema
} = mongoose
mongoose.connect('mongodb://admin:admin123@ds125616.mlab.com:25616/mongo-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Mongodb connected..')
})
exports.ServerToken = mongoose.model('ServerToken', {
    accessToken: String
});
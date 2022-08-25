const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/employeeDB';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => console.log('DB Connected...!')).catch((err) => console.log(err));

require('./employee.model');
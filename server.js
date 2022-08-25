require('./Models/database');

//start express server
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const bodyparse = require('body-parser');



//configure 
const employeeController = require('./controller/employeeController');

//call express function
let app = express();
app.use(bodyparse.urlencoded({
    extended: true
}));
app.use(bodyparse.json());



//view directory [here we use join parameter 'path']
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'mainlayout', layoutsDir: __dirname + '/views/layouts/' }));

//set view engine
app.set('view engine', 'hbs');


app.listen(8080, () => {
    console.log('Server up to 8080');
});



app.use('/employee', employeeController);

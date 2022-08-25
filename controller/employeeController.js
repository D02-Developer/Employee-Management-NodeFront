const express = require('express');
//we need router
let router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');//request statement for mongoose

//create new router
router.get('/', (req, res) => {
    res.render("employee/addOredit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id)
        updateRecord(req, res);
    else
        insertRecord(req, res);
});

//insert data into mongodb
function insertRecord(req, res) {
    //create object of employeeschema
    let employee = new Employee(req.body);

    //save from this schema Object 
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOredit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            console.log('error during record insertion:' + err);
        }
    });
}

//update data into mongodb
function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

// The lean() function tells mongoose to not hydrate query results. In other words, the results of your queries will be the same plain JavaScript objects that you would get from using the Node. js MongoDB driver directly, with none of the mongoose magic.

router.get('/list', async (req, res) => {
    try {
        //DB name is employees.
        const employees = await Employee.find().sort({ _id: 'desc' }).lean();
        res.render('employee/list', {
            list: employees
        });
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
});

router.get('/:id', async (req, res) => {
    //call mongoose function
    const employee = await Employee.findById(req.params.id).lean();
    res.render("employee/addOredit", {
        viewTitle: "Update Employee",
        emp: employee
    });
});

router.get('/delete/:id', async (req, res) => {
    //call mongoose function
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/employee/list');
});


//call function validation
function handleValidationError(err, body) {
    for (field in err.errors) {
        //inside field name of field
        //set path here which is location in employeemodel
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;

            case 'email':
                body['emailError'] = err.errors[field].message;
                break;

            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;

            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            default:
                break;

        }
    }
}


module.exports = router;
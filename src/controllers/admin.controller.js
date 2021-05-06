const adminCtrls = {}

// Models
const User = require('../models/User');

adminCtrls.getUsers = async (req, res) => {
    const users = await User.find();
    res.render('admin/usertable', { users });
};

adminCtrls.newUser = async (req, res) => {
    res.render('admin/newuser');
};

adminCtrls.AddNewUser = async (req, res) => {
    const { name, surname_one, surname_two, address, dni, phone, puesto, gender } = req.body;
    const lastname = surname_one + ' ' + surname_two;
    const password = dni.substring(0, 9);
    const newuser = new User({
        name,
        lastname,
        address,
        dni,
        password,
        phone,
        gender,
        puesto
    });
    if (puesto == "Bombero jefe") {
        newuser.is_admin = true;
    }
    if (gender == 'male') {
        newuser.gender = true;
    }
    newuser.password = await newuser.encryptPassword(password);
    newuser.email = await name.toLowerCase().trim() + '.' + surname_one.toLowerCase().trim() + '@bomberos.es';
    await newuser.save()
        .catch(err => console.error(err));
    res.render('admin/usertable');
}

adminCtrls.getStats = async (req, res) => {
    const numUsers = await User.find().countDocuments();
    res.render('admin/stats', { numUsers });
};

adminCtrls.viewUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('admin/usercard', { user });
};


module.exports = adminCtrls;
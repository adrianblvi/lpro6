const User = require('../models/User');

const createAdminUser = async () => {
    const userFound = await User.findOne({ email: 'admin@admin' });

    if (userFound) return;

    const newUser = new User({
        name: 'Adrian',
        lastname: 'Blanco Vieira',
        email: 'admin@admin',
        dni: '45142073L',
        is_superUser: true,
    });

    newUser.password = await newUser.encryptPassword('blancorules12');

    const admin = await newUser.save();
    console.log('Created Admin User');
};

module.exports = { createAdminUser };
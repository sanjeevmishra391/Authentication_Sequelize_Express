const { User } = require('../models/index');

exports.getAllUsers = async (req, res) => {
    try {
        const products = await User.findAll();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
}

exports.getUserId = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}


exports.updateUser = async (req, res) => {
    console.log(req.params);
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Updated"
        });
    } catch (error) {
        res.json({ message: error.message});
    }  
}

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }});
            res.json({
                "message": "User Deleted"
            });
    } catch (error) {
        res.json({ message: error.message });
    }     
}
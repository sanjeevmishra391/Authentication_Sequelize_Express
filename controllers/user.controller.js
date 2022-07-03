const { User, Address, Balance } = require('../models/index');
const {getCleanUser} = require("../utils/index");

exports.getUser = async (req, res) => {
    try {
        const {id, email} = req.user;
        const user = await User.findOne({
            where: {
                id: id,
                email: email
            }
        });
        return res.json(getCleanUser(user));
    } catch (error) {
        return res.json({ message: error.message });
    }  
}

exports.updateUser = async (req, res) => {
    console.log(req.params);
    try {
        await User.update(req.body, {
            where: {
                id: req.user.id
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
        await User.update({isDeleted: true}, {
            where: {
                id: req.user.id
            }});

        // ADD: logout user after deleting.
            res.json({
                "message": "User Deleted"
            });
    } catch (error) {
        res.json({ message: error.message });
    }     
}

exports.getAllAddresses = async (req, res) => {
    try {
        let addresses = await Address.findAll({
            where: {
                userId: req.user.id
            }
        });

        if(addresses.length==0) {
            return res.send("No address found");
        }

        return res.status(200).send(addresses);
    } catch (error) {
        return res.send("getAllAddresses error");
    }
}

exports.addAddress = async (req, res) => {
    try {
        const {line1, line2, town, zipcode, countryResidence, nationality} = req.body;
        let address = await Address.create({
            userId: req.user.id, 
            line1, line2, town, zipcode, countryResidence, nationality
        });

        if(address) {
            return res.status(200).send({address});
        }

        return res.status(400).send("Some error occured");
    } catch (error) {
        return res.send("addAddress error");
    }
}

exports.updateAddress = async (req, res) => {
    try {

        const {id} = req.body;
        await Address.update(req.body, {
            where: {
                id: id,
                userId: req.user.id
            }});

            res.send({
                "message": "Address updated"
            });
    } catch (error) {
        res.send({ message: error.message });
    }  
}

exports.deleteAddress = async (req, res) => {
    try {
        const {id} = req.body;

        let address  = Address.destroy({
            where: {
                id: id,
                userId: req.user.id
            }
        });

        if(address) {
            return res.status(200).send("Address deleted");
        }

        return res.status(400).send("Some error occured at delete address");
    } catch (error) {
        res.send("deleteAddress error");
    }
}

exports.getBalance = async (req, res) => {
    try {
        let balance  = await Balance.findOne({
            where: {
                userId: req.user.id
            }
        })

        if(balance) {
            return res.status(200).send(balance);
        }

        return res.status(400).send("No balance found");
    } catch (error) {
        return res.send("getBalance error");
    }
}
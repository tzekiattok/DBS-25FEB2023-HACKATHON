import { useRowSelect } from "react-table"
import Account from "../models/AccountModel.js"
import User from "../models/UserModel.js"
import Data from "../models/DataModel.js"

export const innerJoinTest = async (req, res) => {
    Account.hasMany(User, { foreignKey: "email" })
    User.belongsTo(Account, { foreignKey: "email" })
    try {
        const response = await User.findAll({
            where: {
                   email: req.body.email,
                
            },
            include: [
                {
                    model: Account,
                    required: true,
                }
            ]
        })
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log('failed')
        console.log(error.message);
    }

}

//TripleInnerJoin
export const innerJoinTest2 = async (req, res) => {
    Account.hasMany(User, { foreignKey: "email" })
    User.belongsTo(Account, { foreignKey: "email" })
    Data.belongsToMany(User,{ foreignKey: "name" })
    try {
        const response = await User.findAll({
            where: {
                   email: req.body.email,
            },
            include: [
                {
                    model: Account,
                    required: true,
                    include: [{
                        model: Data,
                        required: true,
                    }]
                }
            ]
        })
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log('failed')
        console.log(error.message);
    }

}
export const getAccounts = async (req, res) => {
    console.log('GETTING ACCOUNTS.....')
    console.log('Account obj', Account);
    try {
        const response = await Account.findAll();
        res.status(200).json(response);
        console.log('success')
    } catch (error) {
        console.log('failed')
        console.log(error.message);
    }
}

export const verifyAccount = async (req, res) => {
    console.log('email is ', req.body.email)
    try {
        const response = await Account.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if (response === null) {
            console.log('returning null')
            res.status(200).json(response)
            //Check if NULL in Frontend
        }
        else {
            console.log('account registered in DB');
            //res is the way of returning to the ReactJS frontend
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
        console.log('invalid account')
    }

}

export const createAccount = async (req, res) => {
    try {
        console.log('CREATING NEW ACCOUNT...')
        console.log(req.body)
        await Account.create(req.body);
        res.status(201).json({ msg: "User Created" });
    } catch (error) {
        console.log(error.message);
    }
}

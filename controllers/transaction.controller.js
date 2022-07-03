
/* 
There are two types of transactions:
1. Credit- It is sub-categorised as:
    a. Deposit- Money is added to wallet.
    b. Lottery- User wins lottery.
2. Debit- It is sub-categorised as:
    a. Buy- User buys/donates item(s)
    b. Withdraw- User withdraws money from wallet.
*/

const { Balance, Transaction, WalletTransaction } = require("../models");
const db = require("../models/index");

exports.depositMoneyToWallet = async (req, res) => {
    // from Transaction get the previous totalBalance.
    // in Transaction create new tuple: {transactionWallet: "credit", transactionType: "deposit"}
    // in WalletTransaction create new tuple with transaction id got from above.
    // if above transactions are successful then from Balance get previous credit balance and add credited money.
    const t = await db.sequelize.transaction();
    try {
        const amount = parseFloat(req.body.amount);

        if(isNaN(amount))
            return res.send("Invalid amount format");

        const latestTransaction = await Transaction.findOne({
            where: {
                userId: req.user.id,
            },
            order: [['createdAt', 'DESC']]
        });
        console.log( latestTransaction );
        const newTotalBalance = latestTransaction ? parseFloat(latestTransaction.totalBalance) + amount : amount;

        const newTransaction = await Transaction.create({
            userId: req.user.id,
            transactionWallet: "credit", 
            transactionType: "deposit",
            amount: amount,
            totalBalance: newTotalBalance
        }, { transaction: t })

        console.log( newTransaction );

        if(newTransaction) {
            await WalletTransaction.create({
                transactionId: newTransaction.id,
                mediumOfTransaction: req.body.mediumOfTransaction,
                account: req.body.account
            }, { transaction: t });
        }

        let balance = await Balance.findOne({
            where: {
                userId: req.user.id
            }});

        console.log( balance );
        let newCreditBalance = balance ? parseFloat(balance.creditBalance) + amount : amount; 
        
        console.log(newCreditBalance);

        await Balance.update({
            creditBalance : newCreditBalance
        }, {
            where: {
                userId: req.user.id
            }
        }, { transaction: t })
        
        await t.commit();   

        await Transaction.update({
            status: true
        }, {
            where: {
                id: newTransaction.id
            }
        });
        res.send("Money credited.")
    } catch (error) {
        console.log(error);
        await t.rollback();
        res.send(error);
    }

}
const { GrandDraw, GrandMatch, GrandResult } = require('../models/index');
const dates  = require("../utils/dates.util");

exports.getGrandDrawResultByDate = async (req, res) => {
    try {
        // get grand draw data from grand draw table.
        // get grand match data
        // get user count from grand result table

        const {date} = req.body;
        let req_date = new Date(date);
        let comingSaturday = dates.getSaturdayOfCurrentWeek();

        if(dates.compare(comingSaturday, req_date)==-1) {
            return res.send("Invalid date");
        }

        let grandDraw = await GrandDraw.findAll({
            where: {drawDate: req_date}
        })
        
        if(grandDraw.length==0) {
            res.send("No result found");
        }
        console.log(grandDraw);
        let grandDrawMatch = await GrandMatch.findAll({
                where: { grandDrawId : grandDraw[0].id }
            });
        
        if(grandDrawMatch.length==0) {
            return res.send("Missing data");
        }
        console.log(grandDrawMatch);
        let matchResult = [];
        for(let i=0; i<grandDrawMatch.length; i++) {
            let grandDrawResult = await GrandResult.findAll({
                where: {
                    grandMatchId: grandDrawMatch[i].id
                }
            });
            matchResult.push(grandDrawResult);
        }
        console.log(matchResult);
        let response = {};
        response.grandDrawId = grandDraw.grandDrawId;
        response.matchCount = grandDrawMatch.matchCount;
        response.prizePool = grandDrawMatch.prizePool;
        response.matchResult = matchResult;

        res.send(response);
    } catch (error) {
        res.send({message: "granddrawresult error", error: error});
    }
}

exports.createGrandDraw = async (req, res) => {
    try {
        // get the draw date of grand draw
        const comingSaturday = dates.getSaturdayOfCurrentWeek().toISOString().slice(0, 10);
        const drawDate = req.body.drawDate ? req.body.drawDate : comingSaturday;
        
        // get the winning ticket.
        const winningTicket = [23, 12, 5, 39, 41];

        // get the total amount of grand draw
        const defaultAmount = 5000.00;
        const totalAmount = req.body.totalAmount ? req.body.totalAmount : defaultAmount;

        // create grand draw tuple.
        const grandDraw = await GrandDraw.create({
            drawDate,
            winningTicket,
            totalAmount
        })

        res.send(grandDraw);
    } catch (error) {
        res.send(error);
    }
}
import mongoose from "mongoose"
import Expense from "../models/Expense.js"

export async function addExpense(req, res, next) {
    try {
        const { amount, category, date, description } = req.body
        if (!(amount > 0) || !category || !date) {
            return res.status(400).json({ message: "Invalid input" })
        }
        const expense = await Expense.create({
            user: req.user._id,
            amount,
            category,
            date,
            description
        })
        res.status(201).json(expense)
    } catch (err) {
        next(err)
    }
}

export async function getExpenses(req, res, next) {
    try {
        const expenses = await Expense.find({ user: req.user._id }).sort(
            "-date"
        )
        res.json(expenses)
    } catch (err) {
        next(err)
    }
}

export async function updateExpense(req, res, next) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" })
        }
        const expense = await Expense.findOneAndUpdate(
            { _id: id, user: req.user._id },
            req.body,
            { new: true }
        )
        if (!expense) return res.status(404).json({ message: "Not found" })
        res.json(expense)
    } catch (err) {
        next(err)
    }
}

export async function deleteExpense(req, res, next) {
    try {
        const { id } = req.params
        const result = await Expense.findOneAndDelete({
            _id: id,
            user: req.user._id
        })
        if (!result) return res.status(404).json({ message: "Not found" })
        res.json({ message: "Deleted" })
    } catch (err) {
        next(err)
    }
}

export async function getReport(req, res, next) {
    try {
        const { startDate, endDate } = req.query
        const match = { user: req.user._id }
        if (startDate || endDate) {
            match.date = {}
            if (startDate) match.date.$gte = new Date(startDate)
            if (endDate) match.date.$lte = new Date(endDate)
        }
        const report = await Expense.aggregate([
            { $match: match },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ])
        res.json(report)
    } catch (err) {
        next(err)
    }
}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Donation = new Schema(
    {
        FirstName: { type: String, required: true },
        LastName: { type: String, required: true },
        Birthdate: { type: String, required: true },
        ParentFirstName: { type: String, required: true },
        ParentLastName: { type: String, required: true },
        Address: { type: String, required: true },
        BankAccount: { type: String, required: false },
        AmountPaidRS: { type: String, required: true },
        Description: { type: String, required: false },
        ChequeNumber: { type: String, required: false },
    },
)

module.exports = mongoose.model('donations', Donation)
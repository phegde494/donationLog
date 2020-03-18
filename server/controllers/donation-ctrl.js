
const Donation = require('../models/donation-model')

createDonation = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a donation',
        })
    }

    const donation = new Donation(body)

    if (!donation) {
        return res.status(400).json({ success: false, error: err })
    }

    donation
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: donation._id,
                message: 'Donation created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Donation not created!',
            })
        })
}

updateDonation = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Donation.findOne({ _id: req.params.id }, (err, donation) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Donation not found!',
            })
        }
        donation.FirstName = body.FirstName
        donation.LastName = body.LastName
        donation.Birthdate = body.Birthdate
        donation.ParentFirstName = body.ParentFirstName
        donation.ParentLastName = body.ParentLastName
        donation.Address = body.Address
        donation.BankAccount = body.BankAccount
        donation.AmountPaidRS = body.AmountPaidRS
        donation.Description = body.Description
        donation.ChequeNumber = body.ChequeNumber

        donation
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: donation._id,
                    message: 'Donation updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Donation not updated!',
                })
            })
    })
}

deleteDonation = async (req, res) => {
    await Donation.findOneAndDelete({ _id: req.params.id }, (err, donation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!donation) {
            return res
                .status(404)
                .json({ success: false, error: `Donation not found` })
        }

        return res.status(200).json({ success: true, data: donation })
    }).catch(err => console.log(err))
}

getDonationById = async (req, res) => {
    await Donation.findOne({ _id: req.params.id }, (err, donation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!donation) {
            return res
                .status(404)
                .json({ success: false, error: `Donation not found` })
        }
        return res.status(200).json({ success: true, data: donation })
    }).catch(err => console.log(err))
}

getDonations = async (req, res) => {
    await Donation.find({}, (err, donations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!donations.length) {
            return res
                .status(404)
                .json({ success: false, error: `Donation not found` })
        }
        return res.status(200).json({ success: true, data: donations })
    }).catch(err => console.log(err))
}

module.exports = {
    createDonation,
    updateDonation,
    deleteDonation,
    getDonations,
    getDonationById,
}
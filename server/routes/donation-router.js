const express = require('express')

const DonationCtrl = require('../controllers/donation-ctrl')

const router = express.Router()

router.post('/donation', DonationCtrl.createDonation)
router.put('/donation/:id', DonationCtrl.updateDonation)
router.delete('/donation/:id', DonationCtrl.deleteDonation)
router.get('/donation/:id', DonationCtrl.getDonationById)
router.get('/donations', DonationCtrl.getDonations)

module.exports = router
Hi guys, today you’ll learn how to create a full stack MERN application. If you would like to see the final product, you can scroll down to the end. 

Let’s get started!

Before we get started, you need to know:

Frontend is what you see(the actual interface)

Backend is what goes beneath the frontend(ex. Algorithms, storage)

The main part of this application will be created using Javascript. MERN is an acronym for:

MongoDB: The open-source database we will store our information in.

Express JS: A framework for developing web applications and APIs

React JS: Used to create user interfaces, a Javascript front-end library

Node JS: A javascript runtime that is built on Chrome’s V8 open-source Javascript engine. 

Another way to do this is to use Angular instead of React, but in my opinion, React is more straightforward for us to use, so we’ll use React.

Today, we’ll create the CRUD operations of a donation webpage. We’ll be able to create, read, update, and delete donations.

Let’s get started!

Part 1: Setting up the Backend

Go to the terminal, and there should be some info about your computer followed by a $

If that’s how it looks, then you’re all set.

We’re going to create a new empty directory where we can put all the code in:

If you don’t know what a directory is, it’s basically like a folder or a space in your computer to put stuff. For example, any folder is a directory.
In the terminal, type the following. Ignore the $ because that’s just to show how it should look overall. If you don’t want to do donations, then type something else instead of donations(this applies for the whole thing)

$ mkdir donations-app
$ cd donations-app

Basically, mkdir stands for “make directory”, so we use it to make directories. Also, cd stands for “change directory”, so we use it to go to the respective directory.

Now the message your terminal gives you should contain “donations-app” in it

My terminal ENDS with 
donation-app prajwal$ 

That means that we’re in the “donation-app” directory

Now, let’s create a server directory inside the current directory, and this will be our backend folder. Type the following:

$ mkdir server
$ cd server

Let’s create our package.json now. The package.json file is just a manifest for your Node.js project, it contains the metadata of it. You can manage the dependencies of your project and make scripts that will help you to install dependencies, to generate builds, to run tests and other things.

To create a package.json you need a Package Manager, you can choose NPM (Node Package Manager) or YARN. Feel free to use what you prefer. Type one of the following:

$ yarn init

OR

$ npm init -y

You’re going to be asked a bunch of questions about your project, but type enter to allow the provided default.
Now, you’ll be able to find the package.json file in the server folder
Type ls in the terminal to list the files in that directory, and package.json will show up(that’s the only file in the server directory).

$ ls
package.json

With this file, we can install the dependencies. This might seem complicated, but bear with me.

Type one of the following:

$ yarn add express body-parser cors mongoose nodemon

OR

$ npm install express body-parser cors mongoose nodemon

I’ll tell you what it means now:
Express: It’s the server framework (The E in MERN).
Body Parser: Responsible for getting the body off of network requests.
Nodemon: Restart the server when it sees changes (for a better dev experience).
Cors: Package for providing a Connect/Express middleware that can be used to enable CORS with various options.
Mongoose: It's an elegant MongoDB object modeling for node.js
If you list the server folder you’ll note that something just changed. Now, alongside package.json, the node_modules and yarn_lock(OR package_lock.json if you use npm) are present.
$ ls
node_modules  package.json  yarn.lock

Look at the new folder node_modules and the new file yarn.lock (if you use NPM the file is package-lock.json). With these two files, your project is able to be interpreted. 

Now we can finally create our first NodeJS file.


INSERT INDEX.JS


Now just type in the terminal:

$ node index.js

If it says “Server running on port 3000” then you’re good to go. If you would like to see your server running, then go to a browser and type localhost:3000 

You’ll see the message “Hello World”

Installing MongoDB

THESE ARE THE STEPS FOR MAC
If you’re using another operating system, then click on this link 
Type in the terminal(in the same directory)

$ brew tap mongodb/brew
$ brew install mongodb-community
$ brew services start mongodb-community

Or if you have an old version of mongodb, type…

$ brew services stop mongodb
$ brew uninstall mongodb
$ brew tap mongodb/brew
$ brew install mongodb-community
$ brew services start mongodb-community
Basically what you’re doing in the second one is uninstalling mongodb and installing the newest version.

Now that you have the latest version of mongodb installed, you need to make the directory(a place to store) all the data.

$ mkdir -p /data/db

Now, we need to execute mongodb as a service, so basically start it.

$ brew services start mongodb

Now we started mongodb, so let’s make our own database to store the data. I’m going to name it donations, but you can name it whatever you want.

$ mongo

You’re going to see a lot of stuff pop up in your terminal, now. Don’t worry about this and type the next command.

> use donations

If everything worked correctly, it should say switched to db donations or whatever you named the database.

All Set! We created the database to store information!

Now, since we have the database, we need to connect it to our server.
This is where the javascript will come in and help us develop our backend.

Make sure you’re inside the server folder when you type the next command:

$ mkdir db
$ touch index.js

This will create a new directory called db inside of the server folder, and a file called index.js inside of the server folder, as well.
From now on, when I’m referring to a file, I’ll put directory/file name to make it clear which file I’m talking about. This is because we’ll have multiple files of the same name later.

This is the code you need to copy paste into server/index.js

const express = require('express')
const bodyParser = require('body-parser')
const cors = require(cors)

const db = require('./db')

const app = express()

const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))



Nothing changed in your terminal, so you have to restart the application. To do this, type the following into the terminal(If it doesn’t let you, then press control C)

$ nodemon index.js

If everything worked well, it should say “Server running on port 3000”

If you got an error typing the previous command, just type:

$ node index.js



Now, we need to set up the schema of a donation, or whatever you’re doing.
Basically, we need to define attributes and properties of a donation that we want the database to know about so that it can store a donation object with those properties.

Let’s create a folder called models and add a file called donation-model.js

$ mkdir models
$ cd models
$ touch donation-model.js

Now, go to donation-model.js and paste the following code:
 
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

Now we can create the code to perform CRUD operations and the REST endpoints to basically link it all together. We create a routes folder and a controllers folder. Inside the routes folder, we create the donation-router.js file, and inside the controllers folder, we create the donation-ctrl.js file. Type the following in the terminal.

$ mkdir routes controllers
$ touch routes/donation-router.js
$ touch controllers/donation-ctrl.js
The following is the code for donation-ctrl.js. Copy paste this code into your donation-ctrl.js file.


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




The following is the code for the donation-router.js file. Copy paste it into the file.

const express = require('express')

const DonationCtrl = require('../controllers/donation-ctrl')

const router = express.Router()

router.post('/donation', DonationCtrl.createDonation)
router.put('/donation/:id', DonationCtrl.updateDonation)
router.delete('/donation/:id', DonationCtrl.deleteDonation)
router.get('/donation/:id', DonationCtrl.getDonationById)
router.get('/donations', DonationCtrl.getDonations)

module.exports = router


Now, let’s just add the router into our server/index.js file so that we can test out our application. Copy paste the following code into server/index.js

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const donationRouter = require('./routes/donation-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', donationRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))




Now, our backend should be fully functional. We just have to test it out with a couple tools to make sure it works. You need to download Postman and Robo 3T. Postman lets you send information and calls which will then be saved in the Robo 3T database. It is relatively straightforward to download Postman and Robo 3T. The websites are linked. Just follow the instructions there. Make sure you use the correct instructions based on your computer’s operating system.


Now, we have to create a .json file with the information about the donation.

{
    "FirstName": "FName",
    "LastName": "LName",
    "Birthdate": "1/1/2005",
    "ParentFirstName": "The",
    "ParentLastName": "Parent",
    "Address": "10 Cool Road, Boston MA",
    "BankAccount": "1001001001",
    "AmountPaidRS": "2000",
    "Description": "cool",
    "ChequeNumber": "2284"
}
















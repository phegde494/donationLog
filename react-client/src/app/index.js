import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { DonationsList, DonationsInsert, DonationsUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/donations/list" exact component={DonationsList} />
                <Route path="/donations/create" exact component={DonationsInsert} />
                <Route
                    path="/donations/update/:id"
                    exact
                    component={DonationsUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
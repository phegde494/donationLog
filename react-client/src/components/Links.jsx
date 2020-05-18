import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Charity Foundation Donation Records
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/donations/list" className="nav-link">
                                Donations
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/donations/create" className="nav-link">
                                Create Donation
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateDonation extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/donations/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteDonation extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the donation ${this.props.id} permanently?`,
            )
        ) {
            api.deleteDonationById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class DonationsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            donations: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllDonations().then(donations => {
            this.setState({
                donations: donations.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { donations, isLoading } = this.state
        console.log('TCL: DonationsList -> render -> donations', donations)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'First Name',
                accessor: 'FirstName',
                filterable: true,
            },
            {
                Header: 'Last Name',
                accessor: 'LastName',
                filterable: true,
            },
            {
                Header: 'Birth Date',
                accessor: 'Birthdate',
                filterable: true,
            },
            {
                Header: 'Parent First Name',
                accessor: 'ParentFirstName',
                filterable: true,
            },
            {
                Header: 'Parent Last Name',
                accessor: 'ParentLastName',
                filterable: true,
            },
            {
                Header: 'Address',
                accessor: 'Address',
                filterable: true,
            },
            {
                Header: 'Bank Account',
                accessor: 'BankAccount',
                filterable: true,
            },
            {
                Header: 'Amount Paid RS',
                accessor: 'AmountPaidRS',
                filterable: true,
            },
            {
                Header: 'Description',
                accessor: 'Description',
                filterable: true,
            },
            {
                Header: 'Cheque Number',
                accessor: 'ChequeNumber',
        //        Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteDonation id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateDonation id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!donations.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={donations}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default DonationsList
import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class DonationsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            FirstName: '',
            LastName: '',
            Birthdate: '',
            ParentFirstName: '',
            ParentLastName: '',
            Address: '',
            BankAccount: '',
            AmountPaidRS: '',
            Description: '',
            ChequeNumber: '',
        }
    }

    handleChangeInputFirstName = async event => {
        const FirstName = event.target.value
        this.setState({ FirstName })
    }

    handleChangeInputLastName = async event => {
        const LastName = event.target.value
        this.setState({ LastName })
    }

    handleChangeInputBirthdate = async event => {
        const Birthdate = event.target.value
        this.setState({ Birthdate })
    }

    handleChangeInputParentFirstName = async event => {
        const ParentFirstName = event.target.value
        this.setState({ ParentFirstName })
    }

    handleChangeInputParentLastName = async event => {
        const ParentLastName = event.target.value
        this.setState({ ParentLastName })
    }

    handleChangeInputAddress = async event => {
        const Address = event.target.value
        this.setState({ Address })
    }

    handleChangeInputBankAccount = async event => {
        const BankAccount = event.target.value
        this.setState({ BankAccount })
    }

    handleChangeInputAmountPaidRS = async event => {
        const AmountPaidRS = event.target.value
        this.setState({ AmountPaidRS })
    }

    handleChangeInputDescription = async event => {
        const Description = event.target.value
        this.setState({ Description })
    }

    handleChangeInputChequeNumber = async event => {
        const ChequeNumber = event.target.value
        this.setState({ ChequeNumber })
    }

    handleUpdateDonation = async () => {
        const { FirstName, LastName, Birthdate, ParentFirstName, ParentLastName, Address, BankAccount, AmountPaidRS, Description, ChequeNumber } = this.state
        //const arrayTime = time.split('/')
        const payload = { FirstName, LastName, Birthdate, ParentFirstName, ParentLastName, Address, BankAccount, AmountPaidRS, Description, ChequeNumber}

        await api.insertDonation(payload).then(res => {
            window.alert(`Donation inserted successfully`)
            this.setState({
                FirstName: '',
                LastName: '',
                Birthdate: '',
                ParentFirstName: '',
                ParentLastName: '',
                Address: '',
                BankAccount: '',
                AmountPaidRS: '',
                Description: '',
                ChequeNumber: '',
            })
        })
    }
    componentDidMount = async () => {
        const { id } = this.state
        const donation = await api.getDonationById(id)

        this.setState({
            FirstName: donation.data.data.FirstName,
            LastName: donation.data.data.LastName,
            Birthdate: donation.data.data.Birthdate,
            ParentFirstName: donation.data.data.ParentFirstName,
            ParentLastName: donation.data.data.ParentLastName,
            Address: donation.data.data.Address,
            BankAccount: donation.data.data.BankAccount,
            AmountPaidRS: donation.data.data.AmountPaidRS,
            Description: donation.data.data.Description,
            ChequeNumber: donation.data.data.ChequeNumber,
        })
    }

    render() {
        const { FirstName, LastName, Birthdate, ParentFirstName, ParentLastName, Address, BankAccount, AmountPaidRS, Description, ChequeNumber } = this.state
        return (
            <Wrapper>
                <Title>Create Donation</Title>

                <Label>First Name: </Label>
                <InputText
                    type="text"
                    value={FirstName}
                    onChange={this.handleChangeInputFirstName}
                />
                <Label>Last Name: </Label>
                <InputText
                    type="text"
                    value={LastName}
                    onChange={this.handleChangeInputLastName}
                />
                <Label>Birth Date: </Label>
                <InputText
                    type="text"
                    value={Birthdate}
                    onChange={this.handleChangeInputBirthdate}
                />
                <Label>Parent First Name: </Label>
                <InputText
                    type="text"
                    value={ParentFirstName}
                    onChange={this.handleChangeInputParentFirstName}
                />
                <Label>Parent Last Name: </Label>
                <InputText
                    type="text"
                    value={ParentLastName}
                    onChange={this.handleChangeInputParentLastName}
                />
                <Label>Address: </Label>
                <InputText
                    type="text"
                    value={Address}
                    onChange={this.handleChangeInputAddress}
                />
                <Label>Bank Account: </Label>
                <InputText
                    type="text"
                    value={BankAccount}
                    onChange={this.handleChangeInputBankAccount}
                />
                <Label> Amount Paid RS: </Label>
                <InputText
                    type="text"
                    value={AmountPaidRS}
                    onChange={this.handleChangeInputAmountPaidRS}
                />

                <Label>Description: </Label>
                <InputText
                    type="text"
                    value={Description}
                    onChange={this.handleChangeInputDescription}
                />

                <Label>Cheque Number: </Label>
                <InputText
                    type="text"
                    value={ChequeNumber}
                    onChange={this.handleChangeInputChequeNumber}
                />

                <Button onClick={this.handleUpdateDonation}>Update Donation</Button>
                <CancelButton href={'/donations/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default DonationsUpdate
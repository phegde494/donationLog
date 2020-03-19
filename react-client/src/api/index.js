import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertDonation = payload => api.post(`/donation`, payload)
export const getAllDonations = () => api.get(`/donations`)
export const updateDonationById = (id, payload) => api.put(`/donation/${id}`, payload)
export const deleteDonationById = id => api.delete(`/donation/${id}`)
export const getDonationById = id => api.get(`/donation/${id}`)

const apis = {
    insertDonation,
    getAllDonations,
    updateDonationById,
    deleteDonationById,
    getDonationById,
}

export default apis
import axios from 'axios';

export const createData = (url, payload) => {
    axios.post(url, payload).then(response => {
            return response.data
    }).catch(error => {
        console.log("exception occured while saving data: for the url " + url+ " exception: "+ error)
    })
}

export const updateData = (url, payload) => {
    axios.put(url, payload).then(response => {
            return response.data
    }).catch(error => {
        console.log("exception occured while saving data: for the url " + url+ " exception: "+ error)
    })
}

export const getAll = (url) => {
    axios.get(url).then(response => {
        return response.data
    }).catch(error => {
        console.log("exception occured while saving data: for the url " + url+ " exception: "+ error)
    })
}

export const deleteData = (url) => {
    axios.delete(url).then(response => {
            return response.data
    }).catch(error => {
        console.log("exception occured while saving data: for the url " + url+ " exception: "+ error)
    })
}

export const putData = (url, payload) => {
    return axios.put(url,payload);
}
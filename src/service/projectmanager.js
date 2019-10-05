import axios from 'axios';

export const createData = (url, payload) => {
    axios.post(url, payload).then(response => {
            return response.data
    }).catch(error => {
        console.log("exception occured while saving data: for the url " + url+ " exception: "+ error)
    })
}

export const getAllUser = (url) => {
    axios.get(url).then(response => {
        return response.data
    }).catch(error => {
        console.log("exception occured while saving data: for the url " + url+ " exception: "+ error)
    })
}
const backend_url=import.meta.env.VITE_BACKEND_URL

const summaryAPI={
    sendFile:{
        url:`${backend_url}/api/sendfile`,
        methode:'POST'
    },
    receiveFile:{
        url:`${backend_url}/api/retrieve`,
        methode:'GET'
    }
}

export {summaryAPI}
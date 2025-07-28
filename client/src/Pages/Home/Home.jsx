import React from 'react'
import Retrieve from '../../section/Retrieve/retrieve'
import Send from '../../section/Send/send'

const Home = () => {
    return (
        <>
            <h1>Welcome to Clipboard App</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Retrieve />
                <Send />
            </div>

        </>
    )
}

export default Home
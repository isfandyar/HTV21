import React, { useState } from 'react';
import axios from 'axios'
import ShowEmotion from './ShowEmotion';



function ShowTranscript(props) {
    const [text, setText] = useState("Click Show Transcript");

    const onSubmit = async e => {

        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLY_TOKEN,
                "content-type": "application/json",
            },
        });

        try {
            await assembly.get(`/transcript/${props.id}`)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.status != "completed") setText(res.data.status);
                    else setText(res.data.text);
                })
        } catch (error) {
            console.log(error.response);

            // Check if it's HTTP 400  error
            if (error.response.status === 400) {
                console.log(`HTTP 400 error occured`);
            }
            // You can get response data (mostly the reason would be in it)
            if (error.response.data) {
                console.log(error.response.data);
            }
            // TODO: throw error if you want to handle it somewhere
            // throw error;
        }
    }

    return (
        <div className="container text-center">
            <input
                type='submit'
                value='Show Transcript'
                className='btn btn-primary btn-block mb-3'
                onClick={onSubmit}
            />
            <p className="p-3 mb-3 bg-light text-dark text-start">{text}</p>
            <ShowEmotion text={text}/>
        </div>
    );
}

export default ShowTranscript;

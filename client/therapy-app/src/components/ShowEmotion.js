import React, { useState } from 'react';
import axios from 'axios'



function ShowEmotion(props) {
    const [text, setText] = useState("Click Show Transcript");

    const onSubmit = async e => {
        e.preventDefault();

        const assembly = axios.create({
            baseURL: "https://localhost:5000",
            headers: {
                "content-type": "application/json",
            },
        });

        try {
            console.log('the text: ' + props.text);
            await assembly.post(`/detect`, {"hello":"test"}).then((res) => {
                console.log(res.data)
            })
        } catch (error) {
            console.log(error.response);

        }
    }

    return (
        <div className="container text-center">
            <input
                type='submit'
                value='Show Emotion'
                className='btn btn-primary btn-block mb-3'
                onClick={onSubmit}
            />
            <p className="p-3 mb-3 bg-light text-dark text-start">{text}</p>
        </div>
    );
}

export default ShowEmotion;
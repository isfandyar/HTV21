import React, { useState } from 'react';
import axios from 'axios'



function ShowEmotion(props) {
    const [text, setText] = useState("Click Show Transcript");

    const onSubmit = async e => {
        e.preventDefault();

        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React POST Request Example' })
        // };
        // const response = await fetch('https://localhost:5000', requestOptions);
        // const data = await response.json();
        // alert(data)

        // fetch('http://localhost:5000/detect').then(res => {
        //     res.json()
        //     alert(res)
        // }).catch(err => console.log(err))
        const flask = await axios.post('http://localhost:3000/detect', props.text, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });

        console.log(flask.data);
        setText(flask.data)
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
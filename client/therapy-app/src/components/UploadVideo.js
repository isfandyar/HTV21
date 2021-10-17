import React, { Fragment, useState } from 'react';
import axios from 'axios'
import PlayVideo from './PlayVideo';
import ShowTranscript from './ShowTranscript';


function UploadVideo(url) {
    const [file, setFile] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const [id, setId] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async e => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('', file);


        await axios({
            method: "POST",
            url: "http://localhost:8080/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(response => {
            console.log(response.data)
            setSourceUrl(response.data);

            const assembly = axios.create({
                baseURL: "https://api.assemblyai.com/v2",
                headers: {
                    authorization: process.env.REACT_APP_ASSEMBLY_TOKEN,
                    "content-type": "application/json",
                },
            });

            try {
                console.log("source: " + response.data);
                assembly.post(`/transcript`, {
                    audio_url: response.data
                }).then((res) => {
                    console.log(res.data)
                    setId(res.data.id)
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
                // throw error;l
            }

        })





    }

    return (
        <Fragment>
            <form onSubmit={onSubmit} className="text-center">
                <div class="mb-2">
                    <label for="formFileSm" class="form-label">Please Upload The Video File</label>
                    <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={onChange}/>
                </div>

                <input
                    type='submit'
                    value='Upload'
                    className='btn btn-primary btn-block mb-3'
                />
            </form>
            <PlayVideo url={sourceUrl} />
            <ShowTranscript id={id} />
        </Fragment>
    );
}

export default UploadVideo;

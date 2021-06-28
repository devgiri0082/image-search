import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import axios from "axios";
let Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    background: #d1d1d1;
    display : flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    /* overflow: hidden; */
    .photos {
        margin-top: 20px;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        width: 95%;
        justify-content: center;
    }
    img {
        height: 200px;
        width:auto;
    }
    img:hover{
        border: 1px solid purple;
    }
    input {
        height: 30px;
        width: 300px;
        padding: 5px 10px; 
        outline: none;
        border: 1px solid black;
        margin-right: 10px;
        /* color: white; */
        /* background: purple; */
        border-radius: 5px;

    }
    button {
        /* height: 30px; */
        padding: 5.5px 20px;
        border: 1px solid purple;
        background: purple;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }
    button:hover {
        color: purple;
        background: none;
    }
`

export default function App() {
    let api = "563492ad6f91700001000001399baa3661ac412ea475395bb55013e5";
    let [photos, setPhotos] = useState([]);
    let valueRef = useRef();
    useEffect(() => {
        axios.get(`https://api.pexels.com/v1/curated?per_page=16`, {
            headers: {
                Authorization: api
            }
        }).then((response) => {
            setPhotos(response.data.photos);
        }).catch((err) => console.log("error: ", err));
    }, [api])
    return (
        <Container>
            <div className="search">
                <input type="text" ref={valueRef} placeholder="eg: Nature" />
                <button onClick={getPhoto}>Search</button>
            </div>
            <div className="photos">
                {photos.map((photo, index) =>
                    <a href={photo.url} target="_blank" rel="noopener noreferrer">
                        <img src={photo.src.landscape} alt={`${valueRef}`} key={index} />
                    </a>
                )}
            </div>
        </Container>
    )
    async function getPhoto() {
        try {
            let response = await axios.get(`https://api.pexels.com/v1/search?query=${valueRef.current.value}&per_page=16`, {
                headers: {
                    Authorization: api
                }
            })
            // let data = await response.json();
            // response.data.photos.forEach((photo) => console.log(photo.url));
            setPhotos(response.data.photos);
            valueRef.current.value = "";
        } catch (err) {
            console.log(err);
        }
    }
}

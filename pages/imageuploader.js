import Layout, {C, nextcssReset} from '../components/context';
import * as path from '../components/path';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import { getUserImages , backendImages} from '../services/apiservice';
import { baseConfig} from '../services/restservice';
import { handleAuthSSR } from '../services/auth';
import { useState, useEffect} from 'react';
import { useWindowSize } from '../components/hooks';

function ImageUploader() {

    const thiswindow = useWindowSize();
    const [user, setUser] = useState(null);
    const [fullname, setName] = useState(null);
    const [newerror, setError] = useState(null);
    const [myFile, setFile] = useState();
    const [isSelected, setSelected] = useState(false);
    const [userImages, setImages] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('userFullName') && localStorage.getItem('authorization')) {
            setUser(localStorage.getItem('user'));
            setName(localStorage.getItem('userFullName'));
        }
    }, [])

    useEffect(() => {
        async function loadImages() {
            const images = await getUserImages(user);
            console.log(images);
            if(images) setImages(images);
        }
        if(user) loadImages();
    }, [user])

    // Fetch Uploaded Images from user profile
    const fetchImages = async (e) => {
        e.persist();
        const images = await getUserImages(user);
        console.log(images);
        if(images) setImages(images);
    }

    // Handle File Uploading...
    const handleFile = async (e) => {
        e.preventDefault()
        
        const url = baseConfig.baseURL + "/uploadforuser/" + user;
        const formData = new FormData();
        let percent = 0;
        formData.append('myFile', myFile, myFile.name)
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        const options = {
            onUploadProgress: progressEvent => {
                const {loaded, total} = progressEvent;
                percent = Math.floor((loaded * 100) / total);
                console.log(`${loaded}kb of ${total}kb || Progress: ${percent}`);
            }
        }
        axios.post(url, formData, options).then(res => {
            fetchImages(e);
        });
    }

    // Handle File Selection
    const handleChange = (e) => {
        setFile(e.target.files[0])
        setSelected(true);
    }

    return (
        <div id='mybody'>
            <Head>
                <title>Image Uploader</title>
                <link rel="icon" href="/uplinkflat.png"/>
                <link href="https://fonts.googleapis.com/css2?family=Baloo+Tammudu+2&family=Lato&family=Playfair+Display&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
            </Head>
            <div className='nav'>
                <h1>Image Uploader</h1>
            </div>
            <div className='maincontainer'>
                <div className='uploadimage'>
                    <form onSubmit={(e)=> {
                        e.preventDefault();
                        if(isSelected) handleFile(e)
                        else setError("No File Selected")
                        }}>
                        <label htmlFor='fileinput'>Select file</label>
                        <h1 className='imageselected'>{myFile ? myFile.name: 'No Image Selected'}</h1>
                        <input
                            type='file'
                            onChange={handleChange}
                            autoComplete='none'
                            id='fileinput'
                        />
                        <button type='submit'>Upload Selected File</button>
                    </form>
                </div>
                <div className='myimages'>
                    <h1>My Collection</h1>
                    <div className='images'>
                        {userImages == null ? null: userImages.map((image, i) => {
                            return (<div key={i} className='boxcont'>
                                <img className='boximage' src={backendImages + user + '/' + image.url} />
                            </div>)
                        })}
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .maincontainer {
                    float: left;
                    width: 100%;
                    height: ${thiswindow.height - 70}px;
                    overflow: hidden;
                    position: relative;
                }
                .uploadimage {
                    position: absolute;
                    height: 100%;
                    width: 30%;
                    background: ${C.dark};
                }
                .uploadimage label {
                    float: left;
                    width: 70%;
                    margin: 15%;
                    padding: 10px 0;
                    text-align: center;
                    background: ${C.deepblue};
                    color: white;
                    cursor: pointer;
                    transition: all .2s ease;
                    opacity: ${isSelected ? '.4': '1'};
                    font: 20px 'Roboto';
                }
                .uploadimage label:hover {
                    transform: translateX(4px);
                }
                .uploadimage h1 {
                    float: left;
                    margin: 0;
                    width: 100%;
                    text-align: center;
                    font: 14px 'Roboto';
                    opacity: ${isSelected ? '1': '.4'};
                    color: white;
                }
                .uploadimage form {
                    width: 100%;
                    float: left;
                }
                .uploadimage input {
                    display: none;
                }
                .uploadimage button {
                    float: left;
                    width: 70%;
                    margin: 10px 15%;
                    padding: 10px 0%;
                    border: none;
                    font: 22px 'Roboto';
                    opacity: ${isSelected ? '1': '.4'};
                    cursor: ${isSelected ? 'pointer': 'default'};
                    background: ${C.darkblue};
                }
                .myimages {
                    position: absolute;
                    height: 100%;
                    width: 70%;
                    right: 0;
                    top: 0;
                }
                .myimages h1 {
                    float: left;
                    padding: 10px 20px;
                    font: 22px 'Montserrat';
                }
                .images {
                    float: left;
                    width: 90%;
                    height: ${thiswindow.height - 200}px;
                    padding: 0 5%;
                    margin: 0;
                    margin-top: 10px;
                    overflow: scroll;
                }
                .boxcont {
                    float: left;
                    position: relative;
                    width: 150px;
                    height: 150px;
                    margin: 10px;
                    cursor: pointer;
                    overflow: hidden;
                    box-shadow: 0 0 2px rgba(20,20,20,.2);
                }
                .boximage {
                    position: absolute;
                    height: 200px;
                    width: 200px;
                    top: 50%;
                    left: 50%;
                    transition: all .3s ease;
                    transform: translate(-50%, -50%);
                }
                .boximage:hover {
                    transform: translate(-50%, -50%) scale(1.1, 1.1);

                }
                .nav {
                    float: left;
                    width: 100%;
                    height: 70px;
                    position: relative;
                    background: linear-gradient(to left, ${C.lightblue}, ${C.darkblue}, ${C.deepblue});
                }
                .nav h1 {
                    float: left;
                    color: rgba(255, 255, 255, .9);
                    margin: 0;
                    margin-left: 20px;
                    padding: 19px 0;
                    font: 28px 'Roboto';
                }
                #__next {
                    float: left;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                body {
                    float: left;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                html {
                    float: left;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                #mybody {
                    float: left;
                    width: 100%;
                    height: 100%;
                }
                button:focus {
                    outline: none;
                }
                img {
                    max-height: 200px;
                }
                @media only screen and (max-width: 800px) {
                } 
                @media only screen and (max-width: 1100px) {
                }
            `}</style>
        </div>
    )
}

ImageUploader.getInitialProps = async(ctx) => {
    await handleAuthSSR(ctx);
    return {status: "Authorized"}
}

export default ImageUploader
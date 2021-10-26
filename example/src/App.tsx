import React, {useRef} from 'react';
import {createFileName, useScreenshot} from "usescreenshot-react";

import logo from './img/logo192.png';
import Text from "./components/Text";
import {saveAs} from 'file-saver';

const App = () => {
    const ref = useRef<HTMLDivElement>(null)
    const {image, isLoading, isError, takeScreenshot, clear} = useScreenshot();
    const getImage = () => {
        if (!ref.current) {
            return
        }
        takeScreenshot(ref.current, {backgroundColor: null, logging: false})
            .catch(console.log)
    }
    const getImageAndDownload = () => {
        if (!ref.current) {
            return
        }
        takeScreenshot(ref.current, {backgroundColor: null, logging: false}).then(img => {
            saveAs(img, createFileName('png', 'example'))
        })
            .catch(console.log)
    }
    return (
        isLoading ? (
            <div>Loading...</div>
        ) : (
            <>
                <div>
                    <button onClick={getImage}>Take
                        screenshot
                    </button>
                    <button onClick={getImageAndDownload}>Take
                        a screenshot and download
                    </button>
                    <button onClick={clear}>Clear image</button>
                </div>

                {isError && <div>Error</div>}

                {image &&
                <div>
                    <button onClick={() => saveAs(image, createFileName('png', 'example'))}>Download</button>
                    <br/>
                    <img src={image} alt="screenshot"/>
                </div>
                }
                <div ref={ref} style={{maxWidth: '750px', margin: '0 auto'}}>
                    <img src={logo} alt="React"/>
                    <Text/>
                </div>
            </>

        )
    );
}

export default App;

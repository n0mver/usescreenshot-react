<h1 align="center">usescreenshot-react</h1>

<p align="center"><strong>React hook allows you to take screenshots of webpages or parts of it</strong></p>

<p align="center">
<a href="https://www.npmjs.com/package/usescreenshot-react" rel="nofollow"><img alt="NPM Package" src="https://img.shields.io/npm/v/usescreenshot-react.svg?style=flat-square" /></a>
</p>

## Install

Using npm
```bash
npm install --save usescreenshot-react
``` 

## Usage 

```js
import {useScreenshot, createFileName} from "usescreenshot-react";
```

### Example

See [example](https://github.com/n0mver/usescreenshot-react/tree/main/example) folder

```tsx
import React, {useRef} from "react";
import {useScreenshot} from 'usescreenshot-react';

const Example = () => {
    const {image, takeScreenshot, isLoading, isError} = useScreenshot();
    const ref = useRef<HTMLDivElement>(null);
    
    const getImage = () => {
        if (!ref.current) {
            return
        }
        takeScreenshot(ref.current, {
            backgroundColor: null,
            logging: false,
        }).catch(console.log);
    }
    
    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {isError && <p>Error</p>}
            <div ref={ref}/>
            <h1>Capture Me</h1>
            {image && <img src={image} alt={'Screenshot'}/>}
            <button onClick={getImage}>Take screenshot</button>
        </div>
    );
}
```

## API
`createFileName(extension: string, name?: string): string` - return file name. If the name is not specified, then the current date is returned
### `useScreenshot(type?: string, quality?: number)`
- `type` - String indicating the image format. The default format type is image/png
- `quality` - A number between 0 and 1

[HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
  
The use `useScreenshot` hook returns an object containing the following properties:
- `image: string | undefined` - Screenshot in base64 format
- `takeScreenshot = (captureRef: HTMLElement, options?: Options) => Promise<string>` - Function for creating screenshot from html node and return image string
- `isLoading: boolean` - Indicates if the screenshot is loading
- `isError: boolean` - Indicates whether an error occurred during screenshot loading
- `clear = (): void` - Clear screenshot string

### `takeScreenshot(captureRef: HTMLElement, options?: Options)`
- `captureRef` - Ref to the HTMLElement for which to for which the screenshot should be taken
- `options` - configuration [html2canvas options](https://html2canvas.hertzen.com/configuration) to take a screenshot

## License
MIT © [n0mver](https://github.com/n0mver)

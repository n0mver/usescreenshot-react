# Install

Using npm
```bash
npm install --save usescreenshot-react
``` 

# Usage 

```tsx
import React, {useRef} from "react";
import {useScreenshot} from 'usescreenshot-react';

const Example = () => {
    const {image, takeScreenshot, isLoading, isError} = useScreenshot();
    const ref = useRef<HTMLDivElement>(null)

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {isError && <p>Error</p>}
            <div ref={ref}/>
            <h1>Capture Me</h1>
            {image && <img src={image} alt={'Screenshot'}/>}
            <button onClick={() => takeScreenshot(ref.current)}>Take screenshot</button>
        </div>
    );
}
```
or
```tsx
import React, {useRef} from "react";
import {useScreenshot} from 'usescreenshot-react';

const Example = () => {
    const {takeScreenshot, isLoading, isError} = useScreenshot();
    const ref = useRef<HTMLDivElement>(null)
    const getImage = () => {
        takeScreenshot(ref.current, {
            backgroundColor: null,
            logging: false,
            scale: 2
        }).then(image => console.log(image));
    }

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {isError && <p>Error</p>}
            <div ref={ref}>
                <h1>Capture Me</h1>
            </div>
            <button onClick={getImage}>Take screenshot</button>
        </div>
    );
}
```
## API
### `useScreenshot`
The use `useScreenshot` hook returns an object containing the following properties:
- `image: string | undefined` - Screenshot in base64 format
- `takeScreenshot = (captureRef: HTMLElement | null, options?: Partial<Options> | undefined) => Promise<string | undefined>;` - Function for creating screenshot from html node and return screenshot
- `isLoading: boolean` - Indicates if the screenshot is loading
- `isError: boolean` - Indicates whether an error occurred during screenshot loading
- `clear = ():void` - Clear screenshot string

### `takeScreenshot(captureRef: HTMLElement | null, options?: Partial<Options>)`
- `captureRef` - Ref to the HTMLElement for which to for which the screenshot should be taken
- `options` - configuration [html2canvas options](https://html2canvas.hertzen.com/configuration) to take a screenshot.

## License
MIT

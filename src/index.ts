import {useState} from "react";
import html2canvas, {Options} from "html2canvas";

export const useScreenshot = (type?: string, quality?: number) => {
    const [image, setImage] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const takeScreenshot = async <T extends HTMLElement = HTMLElement>(
        captureRef: T,
        options?: Partial<Options>
    ): Promise<string> => {
        try {
            if (!captureRef) {
                throw new Error("You should provide correct html node");
            }
            setIsLoading(true);
            setIsError(false)
            const canvas = await html2canvas(captureRef, options);
            const base64Image = canvas.toDataURL(type, quality);
            setImage(base64Image);
            return base64Image;
        } catch (error) {
            setIsError(true)
            return Promise.reject((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const clear = () => setImage(undefined);

    return {
        image,
        takeScreenshot,
        isLoading,
        isError,
        clear,
    };
};

export const createFileName = (extension: string, name?: string): string => {
    if (!name) {
        return `${Date.now()}.${extension}`;
    }
    return `${name}.${extension}`;
}


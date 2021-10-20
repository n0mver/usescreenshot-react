import { useCallback, useState } from "react";
import html2canvas, { Options } from "html2canvas";

const useScreenshot = () => {
    const [image, setImage] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const takeScreenshot = async (
        captureRef: HTMLElement | null,
        options?: Partial<Options>
    ) => {
        if (!captureRef) {
            throw new Error('You should provide correct html node.')
        }
        try {
            setIsLoading(true);
            setIsError(false)
            const canvas = await html2canvas(captureRef, options);
            const base64Image = canvas.toDataURL("image/png");
            setImage(base64Image);
            return base64Image;
        } catch (error) {
            setIsError(true)
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    const clear = useCallback(() => setImage(undefined), []);

    return {
        image,
        takeScreenshot,
        isLoading,
        isError,
        clear,
    };
};
export default useScreenshot;

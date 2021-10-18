import { useCallback, useState } from "react";
import html2canvas, { Options } from "html2canvas";

const useScreenshot = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string>();
    const [isError, setIsError] = useState<boolean>(false);

    const takeScreenshot = async (
        captureRef?: HTMLDivElement | null,
        options?: Partial<Options>
    ) => {
        if (!captureRef) {
            throw new Error('You should provide correct html node.')
        }
        try {
            setIsLoading(true);
            const canvas = await html2canvas(captureRef, options);
            const base64Image = canvas.toDataURL("image/png");
            setImage(base64Image);
            return base64Image;
        } catch (error) {
            setIsError(true)
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    const clearImage = useCallback(() => setImage(undefined), []);
    const clear = useCallback(() => {
        setIsError(false)
    }, []);
    return {
        image,
        takeScreenshot,
        isLoading,
        isError,
        clear,
        clearImage
    };
};
export default useScreenshot;

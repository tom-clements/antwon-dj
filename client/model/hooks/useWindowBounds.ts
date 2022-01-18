import { useEffect, useState } from "react";

function getWindow(): Window | null {
    return typeof window !== 'undefined'
        ? window
        : null;
}

function getWindowBounds(window: Window | null) {
    return {
        innerHeight: window?.innerHeight,
        innerWidth: window?.innerWidth
    };
}

export type WindowBounds = ReturnType<typeof getWindowBounds>;

export function useWindowBounds() {
    const window = getWindow();
    const [bounds, setBounds] = useState(getWindowBounds(window));
    const onResize = () => setBounds(getWindowBounds(window));

    useEffect(() => {
        if (window) {
            window.addEventListener("resize", onResize);
            return () => window.removeEventListener("resize", onResize);
        }
    }, [window]);

    return bounds;
}

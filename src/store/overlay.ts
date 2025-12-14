// store/overlay.ts
import { createStore } from "solid-js/store";

interface OverlayMessage {
    id: number;
    text: string;
    success: boolean;
}

const [overlays, setOverlays] = createStore<OverlayMessage[]>([]);

export const addOverlay = (text: string, success = true, duration = 3000) => {
    const id = Date.now(); // unique id
    setOverlays((prev) => [...prev, { id, text, success }]);
    setTimeout(() => {
        setOverlays((current) => current.filter((o) => o.id !== id));
    }, duration);
};

export { overlays };

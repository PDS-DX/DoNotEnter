import {useEffect, useState} from "react";

export default function KeyTracker() {
    const [keys, setKeys] = useState<string[]>([]);
    const [keyPresses, setKeyPresses] = useState<number>(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setKeys([...keys, event.key]);
            setKeyPresses(keyPresses + 1);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [keys]);

    return (
        <div style={{ overflowY: "auto", height: "90vh" }}>
            <h2 style={{ height: "10%" }}>Keys pressed: {keyPresses}</h2>
            <ul style={{overflowY: "auto", height: "90%"}}>
                {keys.map((key, index) => (
                    <li style={{ textDecoration: "none" }} key={index}>{key}</li>
                ))}
            </ul>
        </div>
    );
}
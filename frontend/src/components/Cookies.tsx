import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";

function Cookies() {
    const [cookies, setCookie] = useCookies(['visitor-id']);
    const [firstTimeVisitor, setFirstTimeVisitor] = useState(false);

    useEffect(() => {
        if (!cookies['visitor-id']) {
            setCookie('visitor-id', {name: 'visitor'}, {path: '/'});
            setFirstTimeVisitor(true);
        }
    })

    return (
        <>
            {firstTimeVisitor ? <h1>Welcome to our site!</h1> : <h1>Welcome back!</h1>}
        </>
    );
}

export default Cookies;
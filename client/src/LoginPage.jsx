import { useState, useEffect } from 'react';
import * as stack from "./Stack.js";
import * as network from "./Network.js";
import * as tokenStore from "./TokenStore.js";


function LoginPage(props) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState(null);

    stack.clearStack();

    function handleChangeUser(event) {
        setUser(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        
        try {
            await network.getAuth({username: user, password: password});
            stack.go({name:"InitialPage", data:null });
        }
        catch (err) {
            setError("Usuario o contraseña incorrectos");
            await sleep(3000);
            setError("");
        }
    }

    return (
        <>
            <header>
                <h1>Log in</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>Username: </label>
                        <input type="text" value={user} onChange={handleChangeUser}/>
                    </p>
                    <p>
                        <label>Password: </label>
                        <input type="password" value={password} onChange={handleChangePassword}/>
                    </p>
                    <input type="submit" value="Log in"/>
                </form>
                <p className='error'>{error}</p>
            </main>
        </>
    );
}
export default LoginPage;

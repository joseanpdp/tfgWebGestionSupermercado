import backIcon from "./assets/back.png";
import homeIcon from "./assets/home.png";
import exitIcon from "./assets/exit.png";

import * as stack from "./Stack.js";
import * as tokenStore from "./TokenStore.js";

function Nav(props) {

    function onClickGoHome(ev) {
        stack.clearStack();
        stack.go({name:"InitialPage", data:null});
    }

    function onClickLogOut(ev) {
        stack.clearStack();
        tokenStore.setToken("");
        stack.go({name:"LoginPage", data:null});
    }


    function onClickGoBack(ev) {
        stack.goBack();
    }

    return (
        <nav>
            <p>Hola</p>
            <ul>
                <li onClick={onClickGoBack}><img src={backIcon}/></li>
                <li onClick={onClickGoHome}><img src={homeIcon}/></li>
                <li onClick={onClickLogOut}><img src={exitIcon}/></li>               
            </ul>
        </nav>        
    );
}
export default Nav;

import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import LandingComponent from "../common/components/Landing/Landing.component";
import HomePage from "../common/components/Home/HomePage.component";
import useTranslation from "../common/hooks/useTranslation";

const clientId = "BAx7NH-TFykkBbC-Yyb6FFK6-5LVAmBW9sQ4gZz5akxEPEblxJMKpttHDM5g9S8RAe-aTfwErtnj6thcWzwu-kM";

function App() {
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

    const {t}=useTranslation();
    useEffect(() => {
        const init = async () => {
            try {
                const web3auth = new Web3Auth({
                    clientId,
                    chainConfig: {
                        chainNamespace: CHAIN_NAMESPACES.EIP155,
                        chainId: "0x1",
                        rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
                    },
                });

                setWeb3auth(web3auth);

                await web3auth.initModal();
                if (web3auth.provider) {
                    setProvider(web3auth.provider);
                }
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    const login = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
        window.localStorage.setItem('isWalletConnected', 'true')
    };
    
    const logout = async () => {
        if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
        }
        await web3auth.logout();
        setProvider(null);
        window.localStorage.setItem('isWalletConnected', 'false')
    };

    return (
        <div className="container">
            <div className="grid">
                {typeof window !== 'undefined' && window.localStorage?.getItem('isWalletConnected') === 'true' ? 
                <HomePage/>  : 
                <LandingComponent setClickLogin={login} />
      }
            </div>
        </div>
    );
}

export default App;

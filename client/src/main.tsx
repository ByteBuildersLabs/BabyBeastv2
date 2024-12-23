import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import { init } from "@dojoengine/sdk";
import { Schema, schema } from "./dojo/bindings.ts";
import { dojoConfig } from "../dojoConfig.ts";
import { DojoContextProvider } from "./dojo/DojoContext.tsx";
// import { setupBurnerManager } from "@dojoengine/create-burner";

import { sepolia } from "@starknet-react/chains";
import { StarknetConfig, starkscan } from "@starknet-react/core";
import { RpcProvider } from "starknet";
import cartridgeConnector from "./cartridgeConnector.tsx";

function provider() {
    return new RpcProvider({
        nodeUrl: "https://api.cartridge.gg/x/starknet/sepolia",
    });
}

async function main() {
    const sdk = await init<Schema>(
        {
            client: {
                rpcUrl: dojoConfig.rpcUrl,
                toriiUrl: dojoConfig.toriiUrl,
                relayUrl: dojoConfig.relayUrl,
                worldAddress: dojoConfig.manifest.world.address,
            },
            domain: {
                name: "WORLD_NAME",
                version: "1.0",
                chainId: "KATANA",
                revision: "1",
            },
        },
        schema
    );

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <DojoContextProvider
                // burnerManager={await setupBurnerManager(dojoConfig)}
            >
                <StarknetConfig
                    autoConnect
                    chains={[sepolia]}
                    connectors={[cartridgeConnector]}
                    explorer={starkscan}
                    provider={provider}
                >
                    <App sdk={sdk} />
                </StarknetConfig>
            </DojoContextProvider>
        </StrictMode>
    );
}

main().catch((error) => {
    console.error("Helloo Failed to initialize the application:", error);
});

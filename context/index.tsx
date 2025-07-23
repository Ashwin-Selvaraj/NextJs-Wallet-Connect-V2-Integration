//context provider to wrap our application and initial the app kit

'use client'

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { wagmiAdapter, projectId } from "../config/index";
import { createAppKit } from "@reown/appkit";
import {mainnet, bsc} from "@reown/appkit/networks";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {type ReactNode} from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();
if(!projectId){
    throw new Error("Project Id is not defined");
}

const metadata = {
    name: "The Meme TV",
    description: "Mini App for Meme TV",
    icon: ["https://example.com/icon.png"],
    url: "https://example.com",
};

export const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, bsc],
    defaultNetwork: mainnet,
    features: {
        analytics: true,
        email: true,
        socials: ['google', 'x', 'discord', 'facebook', 'github'],
        emailShowWallets: true,
    },
    themeMode: 'dark',
});

//function that sets the context provider
function ContextProvider({children, cookies}: {children: ReactNode, cookies: string}) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);
    return (
            <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
    );
}
export default ContextProvider;

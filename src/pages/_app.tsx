// src/pages/_app.tsx
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  LIVE_EVENT_TOAST,
  PLATFORM_CREATOR_ADDRESS,
  RPC_ENDPOINT,
  TOKENS,
} from "../../config";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { AppProps } from "next/app";
import { GAMES } from "../games";
import { GambaPlatformProvider } from "gamba-react-ui-v2";
import { GambaProvider } from "gamba-react-v2";
import React from "react";
import { Toaster } from "sonner";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

function MyApp({ Component, pageProps }: AppProps) {
  const wallets = React.useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider
      endpoint={RPC_ENDPOINT}
      config={{ commitment: "processed" }}
    >
      <WalletProvider autoConnect wallets={wallets}>
        <WalletModalProvider>
          <GambaProvider>
            <GambaPlatformProvider
              creator={PLATFORM_CREATOR_ADDRESS}
              games={GAMES}
              tokens={TOKENS}
              defaultCreatorFee={0.05} // 5%
              defaultJackpotFee={0.05} // 5%
            >
              <Component {...pageProps} />
              <Toaster
                position="bottom-right"
                richColors
                toastOptions={{
                  style: { background: "#15151f" },
                }}
              />
            </GambaPlatformProvider>
          </GambaProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;

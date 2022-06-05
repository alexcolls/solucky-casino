// Connect Phantom
function phantom_wallet() {

    // Check for Solana & Phantom
    var provider = () => {
        if ("solana" in window) {
            var provider = window.solana;
            if (provider.isPhantom) {
                return provider;
            } else {
                return false;
            }
        }
        window.open("https://phantom.app", "_blank");
    };

    var phantom = provider();

    if (phantom !== false) {

        console.log("Phantom Wallet Found, Connecting..");

        try {

            // Connect to Solana
            var connect_wallet = phantom.connect();

            // After Connecting
            phantom.on("connect", () => {

                // Check Connection
                console.log("Phantom Connected: " + phantom.isConnected);

                // Get Wallet Address
                var wallet_address = phantom.publicKey.toString();
                console.log("Solana Wallet Address: " + wallet_address);
                const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

                return (async () => {
                    var balance = await connection.getBalance(phantom.publicKey) / solanaWeb3.LAMPORTS_PER_SOL;
                    console.log(`${balance} SOL`);
                    return balance;
                })();

            });
            //

        } catch (err) {
            console.log("Connection Cancelled!");
        }
    }

}

phantom_wallet();

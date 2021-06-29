import { ApiPromise, WsProvider } from '@polkadot/api';
import { Container, Button, Loader, Grid, Sticky, Message } from 'semantic-ui-react';


async function main() {
    // Initialise the provider to connect to the local node
    const provider = new WsProvider('ws://127.0.0.1:9944');

    // Create the API and wait until ready
    const api = await ApiPromise.create({ provider });

    // Retrieve the chain & node information information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);


    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

function poe() {
    alert('goodd')
}

export default function Test2() {
    main()
    return (
        <Container>

            <Button onClick={poe}>hello ,world!</Button>
        </Container>
        
    )
}




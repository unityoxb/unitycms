// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

async function main() {
  // Construct
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({ provider: wsProvider });

  console.log(api.genesisHash.toHex())
}

main().then(() => {
  // Do something
  console.log('completed')
})



export default function Test() {
  return (
    <main />
  )
}


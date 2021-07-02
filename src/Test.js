// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

async function main () {
  // Construct
  const wsProvider = new WsProvider('wss://chain.scifanchain.com');
  const api = await ApiPromise.create({ provider: wsProvider });

  console.log(api.genesisHash.toHex())
}

main().then(() => {
  // Do something
  console.log('completed')
})



export default function Test (){
  return (
    <main />
  )
}


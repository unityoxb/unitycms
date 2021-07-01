// import { Keyring } from '@polkadot/keyring';
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';

import { Container, Dimmer, Loader, Grid, Message } from 'semantic-ui-react';
import { DeveloperConsole } from './substrate-lib/components';

import { stringToU8a, u8aToHex } from '@polkadot/util';


async function main() {

    // await cryptoWaitReady();

    // // create a keyring with some non-default values specified
    // const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

    // const mnemonic = mnemonicGenerate();

    // // create & add the pair to the keyring with the type and some additional
    // // metadata specified
    // const pair = keyring.addFromUri(mnemonic, { name: 'unity' }, 'ed25519');

    // // create Alice based on the development seed
    // const alice = keyring.addFromUri('//Alice');

    // // create the message, actual signature and verify
    // const message = stringToU8a('this is our message');
    // const signature = alice.sign(message);
    // const isValid = alice.verify(message, signature);

    // console.log(keyring.pairs.length, 'pairs available');
    // console.log(`${u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);

    // // log the name & address (the latter encoded with the ss58Format)
    // console.log(pair.meta.name, 'has address', pair.address);

    const mnemonic = mnemonicGenerate(12);

    // keyring.loadAll({type: 'sr25519' });

    // add the account, encrypt the stored JSON with an account-specific password
    // const { pair, json } = keyring.addUri(mnemonic, 'myStr0ngP@ssworD', { name: 'unityoxb' });

    const accounts = keyring.getAccounts();

    accounts.forEach(({ address, meta, publicKey }) =>
        console.log(address, JSON.stringify(meta), u8aToHex(publicKey))
    );


}

main().then(() => console.log('completed'))

export default function About () {
    return (
        <main />
    )
    
}
import React, { useEffect, useState } from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSubstrate } from '../substrate-lib';

import { hdLedger, hdValidatePath, keyExtractSuri, mnemonicGenerate, mnemonicValidate, randomAsU8a, mnemonicToLegacySeed } from '@polkadot/util-crypto';

const { Keyring } = require('@polkadot/api');

export default function Main(props) {

    const { api, keyring } = useSubstrate();
    const [balances, setBalances] = useState({});

    const mnemonic = mnemonicGenerate()
    const keyring2 = new Keyring({ type: 'sr25519' });
    const pair  = keyring2.addFromUri(mnemonic);

    console.log(pair)

    useEffect(() => {
        const addresses = keyring.getPairs().map(account => account.address);
        let unsubscribeAll = null;

        api.query.system.account
            .multi(addresses, balances => {
                const balancesMap = addresses.reduce((acc, address, index) => ({
                    ...acc, [address]: balances[index].data.free.toHuman()
                }), {});
                setBalances(balancesMap);
            }).then(unsub => {
                unsubscribeAll = unsub;
            }).catch(console.error);

        api.query.system.account(pair.address, aliceAcct => {
            console.log("Subscribed to Unity account.");
            const aliceFreeSub = aliceAcct.data.free;
            console.log(`Unity Account (sub): ${aliceFreeSub}`);
            console.log(`Unity Address: ${pair.address}`);
        });

        return () => unsubscribeAll && unsubscribeAll();
    }, [api, keyring, setBalances]);

    return (
        <Grid.Column>
            <h1>区块链钱包</h1>
            <Table celled striped size='small'>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>助记词</strong>
                        </Table.Cell>
                        <Table.Cell width={10}>
                            <strong>{mnemonic}</strong>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>类型</strong>
                        </Table.Cell>
                        <Table.Cell width={10}>
                            <strong>{pair.type}</strong>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>公钥</strong>
                        </Table.Cell>
                        <Table.Cell width={10}>
                            <strong>{pair.publicKey}</strong>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>地址</strong>
                        </Table.Cell>
                        <Table.Cell width={10}>
                            <strong>{pair.address}</strong>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Grid.Column>
    );
}

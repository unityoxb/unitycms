import React, { useEffect, useState } from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSubstrate } from '../substrate-lib';

import { hdLedger, hdValidatePath, keyExtractSuri, mnemonicGenerate, mnemonicValidate, randomAsU8a } from '@polkadot/util-crypto';

const { Keyring } = require('@polkadot/api');

export default function Main(props) {

    const { api, keyring } = useSubstrate();
    const [balances, setBalances] = useState({});

    const mnemonic = mnemonicGenerate()
    const keyring2 = new Keyring({ type: 'sr25519' });
    const alice = keyring2.addFromUri(mnemonic);

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

        api.query.system.account(alice.address, aliceAcct => {
            console.log("Subscribed to Unity account.");
            const aliceFreeSub = aliceAcct.data.free;
            console.log(`Unity Account (sub): ${aliceFreeSub}`);
            console.log(`Unity Address: ${alice.address}`);
        });

        return () => unsubscribeAll && unsubscribeAll();
    }, [api, keyring, setBalances]);

    return (
        <Grid.Column>
            <h1>钱包地址</h1>
            <Table celled striped size='small'>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>用户名</strong>
                        </Table.Cell>
                        <Table.Cell width={10}>
                            <strong>{mnemonic}</strong>
                        </Table.Cell>
                    </Table.Row>
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
                            <strong>地址</strong>
                        </Table.Cell>
                        <Table.Cell width={10}>
                            <strong>{alice.address}</strong>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Grid.Column>
    );
}

import React, { useEffect, useState } from 'react';
// Import the keyring as required
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Table, Grid, Header } from 'semantic-ui-react';

import keyring from '@polkadot/ui-keyring';


function Main(){

    const [phrase, setPhrase] = useState('')
    const [pair, setPair] = useState('')

    const [adderss, SetAddrerss] = useState('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
    // const p = keyring.getPair(adderss)

    const [accountAddress, setAccountAddress] = useState(null);

    useEffect(() => {
        async function getAccount(){

            keyring.loadAll({ ss58Format: 42, type: 'sr25519' });

            if (adderss === '') {
               
                // Some mnemonic phrase
                const mnemonic = mnemonicGenerate(24);
                // Add an account, straight mnemonic
                const { pair, json } = keyring.addUri(mnemonic, 'myStr0ngP@ssworD', { name: 'oxb-001' });

                console.log(pair.meta.name)

                setPhrase(mnemonic)
                setPair(pair)
            }
            else {
                const FAUCET_ADDR = 'FvnazYM5KAetYpXoVDfqt9WFcJogKbekXVJ3Fz5oW2Dv82P';
                const json = keyring.saveAddress(FAUCET_ADDR, { name: 'Alex faucet' });

                // the faucet will now be in the list of available addresses

                const accs = keyring.getAddresses();
                console.log(accs)
            }
        }
        
        getAccount();
        

    }, [keyring])

    return (
        <Grid.Column>
            <Header as='h3' textAlign='center' color='violet' attached='top'>钱包地址</Header>
            <Table celled striped size='small' attached>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>用户名</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>{pair.name}</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>钱包用户名与赛凡链用户名统一</strong>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>助记词</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>{phrase}</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>助记词是您地址丢失后重要的找回信息，请立即复制保存！本系统不会保留您的助记词。</strong>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>类型</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>{pair.type}</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong></strong>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>公钥</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>{pair.publicKey}</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>可以对外公布</strong>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>地址</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>{pair.address}</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>您的钱包地址</strong>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Grid.Column>
    )


}

export default Main;



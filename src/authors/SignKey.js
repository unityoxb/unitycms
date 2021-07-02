import React, { useEffect, useState } from 'react';
// Import the keyring as required
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Table, Grid, Header } from 'semantic-ui-react';

import { useRecoilState } from 'recoil';
import { mnemonicState } from '../StateManager'

import keyring from '@polkadot/ui-keyring';

import axios from 'axios'


function Main(){

    // 同步用户状态
    const [mnemonic, setMnemonic] = useRecoilState(mnemonicState);

    const [loading, setLoading] = useState(true);
    const [author, SetAuthor] = useState({})


    useEffect(() => {
        let token = window.localStorage.getItem("scifanchain_access_token")
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        axios({
            method: 'get',
            url: 'https://api.scifanchain.com/authors/me/',
        }).then(response => {
            setLoading(false)            
            SetAuthor(response.data)
            
            // console.log(response.data.refresh_token)
            // console.log(response.data)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        });
    }, [])

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
                            <strong>{author.username}</strong>
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
                            <strong>{mnemonic}</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>助记词是您地址丢失后重要的找回信息，请立即复制保存！本系统不会保留您的助记词。</strong>
                        </Table.Cell>
                    </Table.Row>
                    {/* <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>类型</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>{pair.type}</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong></strong>
                        </Table.Cell>
                    </Table.Row> */}
                    {/* <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>公钥</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>{pair.publicKey}</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>可以对外公布</strong>
                        </Table.Cell>
                    </Table.Row> */}
                    <Table.Row>
                        <Table.Cell width={2} textAlign='right'>
                            <strong>钱包地址</strong>
                        </Table.Cell>
                        <Table.Cell width={4}>
                            <strong>{author.chain_address}</strong>
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



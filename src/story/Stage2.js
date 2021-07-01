import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Container, Header, Button, Dimmer, Loader, Grid, Sticky, Message  } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'

// Pre-built Substrate front-end utilities for connecting to a node
// and making a transaction.
import { SubstrateContextProvider, useSubstrate } from '../substrate-lib';
import { DeveloperConsole, TxButton } from '../substrate-lib/components';

// Polkadot-JS utilities for hashing data.
import { blake2AsHex } from '@polkadot/util-crypto';

export default function Stage() {
    const [accountAddress, setAccountAddress] = useState(null);
    const { apiState, keyring, keyringState, apiError } = useSubstrate();


    const accountPair =
        accountAddress &&
        keyringState === 'READY' &&
        keyring.getPair(accountAddress);

    const loader = text =>
        <Dimmer active>
            <Loader size='small'>{text}</Loader>
        </Dimmer>;

    const message = err =>
        <Grid centered columns={2} padded>
            <Grid.Column>
                <Message negative compact floating
                    header='Error Connecting to Substrate'
                    content={`${JSON.stringify(err, null, 4)}`}
                />
            </Grid.Column>
        </Grid>;
    
    if (apiState === 'ERROR') return message(apiError);
    else if (apiState !== 'READY') return loader('正在连接赛凡链……');

    if (keyringState !== 'READY') {
        return loader('Loading accounts (please review any extension\'s authorization)');
    }


    // React hooks for all the state variables we track.
    // Learn more at: https://reactjs.org/docs/hooks-intro.html
    const [status, setStatus] = useState('');
    const [digest, setDigest] = useState('');
    const [owner, setOwner] = useState('');
    const [block, setBlock] = useState(0);

    const [loading, setLoading] = useState(true);
    const [stage, setStage] = useState([])
    const [error, setError] = useState('')
    
    const location = useLocation();

    const state = useRef(null);

    // 执行PoE逻辑
    // 对内容进行hash
    const handlePoE = () => {
        let stageContent = document.getElementById('stageContent').innerHTML;
        const allContent = {
            id: 1,
            title: 'good',
            content: stageContent
        }
        const jsonContent = JSON.stringify(allContent)
        const hash = blake2AsHex(jsonContent, 256);
        setDigest(hash);
        alert(jsonContent)
    }

    useEffect(() => {
        let token = window.localStorage.getItem("scifanchain_access_token")
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get('https://api.scifanchain.com/stages/' + location.stage_id)
            .then(function (response) {
                // 处理成功情况
                setLoading(false)
                setStage(response.data)
                setError('')
                console.log(response);
            })
            .catch(function (error) {
                // 处理错误情况
                setLoading(false)
                setStage({})
                setError('很抱歉，没有获取到数据！')
                console.log(error);
            });
    }, [])

    // React hook to update the owner and block number information for a file.
    useEffect(() => {
        let unsubscribe;

        // Polkadot-JS API query to the `proofs` storage item in our pallet.
        // This is a subscription, so it will always get the latest value,
        // even if it changes.
        api.query.poe
            .proofs(digest, (result) => {
                // Our storage item returns a tuple, which is represented as an array.
                setOwner(result[0].toString());
                setBlock(result[1].toNumber());
            })
            .then((unsub) => {
                unsubscribe = unsub;
            });

        return () => unsubscribe && unsubscribe();
        // This tells the React hook to update whenever the file digest changes
        // (when a new file is chosen), or when the storage subscription says the
        // value of the storage item has updated.
    }, [digest, api.query.poe]);

    return (
        <div>
            {loading &&
                <div className="text-center">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">正在加载...</span>
                    </div>
                </div>
            }

            {!loading && !error &&
                <SubstrateContextProvider>
                <AccountSelector setAccountAddress={setAccountAddress} />
                <Container>
                
                    <Header>{stage.title}</Header>
                    <div id='stageContent'>{stage.content}</div>

                    <Button color='violet' onClick={handlePoE}>存证</Button>

                    <Button.Group basic size='small' floated='right'>
                        <Button icon='file' />
                        <Button icon='save' />
                        <Button icon='upload' />
                        <Button icon='download' />
                    </Button.Group>

                </Container>
                </SubstrateContextProvider>
           }

        </div>
    )
}

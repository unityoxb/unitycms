// Import
import React, { useEffect, useState, createRef } from 'react';
import { Container, Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { SubstrateContextProvider, useSubstrate } from './substrate-lib';

import Transfer from './Transfer';


function Main() {
  // Construct
  const [accountAddress, setAccountAddress] = useState(null);
  const { api, apiState, keyring, keyringState, apiError } = useSubstrate();

  useEffect(() => {
    setAccountAddress('5Gr7UxRsjAf6ftfvQLHsNrv6JwaWPVHmm2bQKYdrJT41DL95')
  }, [])

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

  const contextRef = createRef();

  // console.log(accountPair)

  // console.log(api.genesisHash.toHex());

  // console.log(api.consts.babe.epochDuration.toNumber());

  // The amount required to create a new account
  console.log(api.consts.balances.existentialDeposit.toNumber());

  // The amount required per byte on an extrinsic
  console.log(api.consts.transactionPayment.transactionByteFee.toNumber());

  return (
    <div ref={contextRef}>
      <Transfer accountPair={accountPair} />
    </div>
  )

}

export default function Appdfd () {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>

  );

};
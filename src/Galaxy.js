import React, { useEffect, useState, createRef } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import axios from 'axios'
import qs from 'qs'
import TheBook from './story/TheBook';


const contextRef = createRef();


function Galaxy() {

   return (
        <div ref={contextRef}>
            <Container>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={3}>
                        <TheBook ></TheBook>
                    </Grid.Column>
                        <Grid.Column width={8}>
                            <span>galaxy</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}

export default Galaxy
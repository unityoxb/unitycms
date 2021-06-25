import React, { useEffect, useState, createRef } from 'react';
import { Grid, } from 'semantic-ui-react';
import axios from 'axios'
import qs from 'qs'


const contextRef = createRef();


function Galaxy() {

   return (
        <div ref={contextRef}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <span>galaxy</span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

export default Galaxy
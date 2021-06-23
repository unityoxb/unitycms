import React, { useEffect, useState, createRef } from 'react';
import { Grid, } from 'semantic-ui-react';

const contextRef = createRef();


function Works() {
    return (
        <div ref={contextRef}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <span>works</span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

export default Works
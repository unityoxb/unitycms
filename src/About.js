import React, { useEffect, useState, createRef } from 'react';
import {  Grid, } from 'semantic-ui-react';

const contextRef = createRef();


function About() {
    return (
        <div ref={contextRef}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <span>about</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
          
        </div>
    )
}

export default About
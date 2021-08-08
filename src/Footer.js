import React, { useState} from 'react';
import { Menu, Container } from 'semantic-ui-react'

export default function Froter() {
    const { activeItem, setActiveItem } = useState('closest')

    const handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    return (
        <Container fluid>
            <Menu text>
                <Menu.Item header>Sort By</Menu.Item>
                <Menu.Item
                    name='closest'
                    active={activeItem === 'closest'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='mostComments'
                    active={activeItem === 'mostComments'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='mostPopular'
                    active={activeItem === 'mostPopular'}
                    onClick={handleItemClick}
                />
            </Menu>
        </Container>
    )
}
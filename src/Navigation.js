import React, { Component } from 'react'
import {Menu, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {
    Link
} from 'react-router-dom'


export default class Navigation extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu pointing>
                {/* <Image src={`${process.env.PUBLIC_URL}/assets/scifanchain_logo_black_white.png`} size='mini' /> */}
                <Menu.Item header>赛凡链</Menu.Item>
                <Menu.Item as={Link} to='/home'
                    name='home'
                    active={activeItem === 'home'}
                    content="首页"
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Item as={Link} to='/glaxy'
                    name='银河书'
                    active={activeItem === '银河书'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Item as={Link} to='/about'
                    name='纪元'
                    active={activeItem === '纪元'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Item as={Link} to='/about'
                    name='创作中心'
                    active={activeItem === '创作中心'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Item as={Link} to='/about'
                    name='社区治理'
                    active={activeItem === '社区治理'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Item
                    name='链世界'
                    active={activeItem === '链世界'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        content="退出"
                        onClick={this.handleItemClick}>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
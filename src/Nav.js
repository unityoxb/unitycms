import React, { Component } from 'react'
import {Menu, Button, Modal} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {
    Link
} from 'react-router-dom'



export default class Nav extends Component {
    state = { activeItem: 'home'}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        const storage = window.localStorage;

        return (
                <Menu pointing>
                    {/* <Image src={`${process.env.PUBLIC_URL}/assets/scifanchain_logo_black_white.png`} size='mini' /> */}
                    <Menu.Item header>赛凡链</Menu.Item>
                    <Menu.Item as={Link} to='/'
                        name='home'
                        active={activeItem === 'home'}
                        content="首页"
                        onClick={this.handleItemClick}>
                    </Menu.Item>
                    <Menu.Item as={Link} to='/work'
                        name='作品'
                        active={activeItem === '作品'}
                        onClick={this.handleItemClick}>
                    </Menu.Item>
                    <Menu.Item as={Link} to='/about'
                        name='纪元'
                        active={activeItem === '纪元'}
                        onClick={this.handleItemClick}>
                    </Menu.Item>
                    <Menu.Item as={Link} to='/create'
                        name='创作中心'
                        active={activeItem === '创作中心'}
                        onClick={this.handleItemClick}>
                    </Menu.Item>
                    <Menu.Item as={Link} to='/community'
                        name='社区治理'
                        active={activeItem === '社区治理'}
                        onClick={this.handleItemClick}>
                    </Menu.Item>
                    <Menu.Item as={Link} to='/finance'
                        name='财政'
                        active={activeItem === '财政'}
                        onClick={this.handleItemClick}>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to='/sign-in'
                            name='登录'
                            active={activeItem === '登录'}
                            onClick={this.handleItemClick}>
                        </Menu.Item>
                        <Menu.Item as={Link} to='/sign-up'
                            name='注册'
                            active={activeItem === '注册'}
                            onClick={this.handleItemClick}>
                        </Menu.Item>
                        <Menu.Item
                            name={storage.scifanchain_username}
                            active={activeItem === 'logout'}
                            onClick={this.handleItemClick}>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
        )
    }
}
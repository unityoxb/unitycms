import React, { Component } from 'react'
import {Menu, Button, Modal, Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {Link} from 'react-router-dom'

export default class Nav extends Component {

    
    state = { activeItem: 'home'}
    state = { username: window.localStorage.scifanchain_username}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    handleLogout = () => { 
        window.localStorage.removeItem('scifanchain_username');
        window.localStorage.removeItem('scifanchain_access_token');
        this.setState({username:''})
    }

    render() {
        const { activeItem, username } = this.state

        return (
            <Menu pointing violet >
                {/* <Image src={`${process.env.PUBLIC_URL}/assets/scifanchain_logo_black_white.png`} size='mini' /> */}
                <Menu.Item header>赛凡链</Menu.Item>
                <Menu.Item as={Link} to='/'
                    name='home'
                    active={activeItem === 'home'}
                    content="首页"
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Item as={Link} to='/galaxy'
                    name='银河书'
                    active={activeItem === '银河书'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                {/* <Menu.Item as={Link} to='/about'
                    name='纪元'
                    active={activeItem === '纪元'}
                    onClick={this.handleItemClick}>
                </Menu.Item> */}
                <Menu.Item as={Link} to='/create'
                    name='创作营地'
                    active={activeItem === '创作营地'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                {/* <Menu.Item as={Link} to='/community'
                    name='社区治理'
                    active={activeItem === '社区治理'}
                    onClick={this.handleItemClick}>
                </Menu.Item> */}
                <Menu.Item as={Link} to='/finance'
                    name='链上信息'
                    active={activeItem === '链上信息'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Menu position='right'>
                    {username &&
                        <Dropdown text={username} pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Header>创作中心</Dropdown.Header>
                                <Dropdown.Item>工作室</Dropdown.Item>
                                <Dropdown.Item>合作者</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Header>账户</Dropdown.Header>
                                <Dropdown.Item>设置</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleLogout}>
                                    退出
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {!username &&
                        <Menu.Item as={Link} to='/sign-in'
                            name='登录'
                            active={activeItem === '登录'}
                            onClick={this.handleItemClick}>
                        </Menu.Item>
                        }
                    {!username &&
                    <Menu.Item as={Link} to='/sign-up'
                        name='注册'
                        active={activeItem === '注册'}
                        onClick={this.handleItemClick}>
                    </Menu.Item>
                    }
                </Menu.Menu>
            </Menu>
        )
    }
}
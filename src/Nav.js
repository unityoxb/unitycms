import React, { Component, useState, createRef } from 'react'
import { Input, Menu, Segment, Image } from 'semantic-ui-react'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import MenuLeft from './Menu'


const Time = () => (
    <div>
        <h2>Time</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route exact path={match.path} render={() => (
            <h3>Please select a topic.</h3>
        )} />
    </div>
)


export default class MenuTop extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
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

                <Route path="/time" component={Time} />
                <Route path="/about" component={About} />
                <Route path="/glaxy" component={MenuLeft} />
                <Route path="/topics" component={Topics} />
            </div>
        )
    }
}
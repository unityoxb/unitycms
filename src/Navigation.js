import React, { Component, useState } from 'react'
import {Menu, Button, Modal, Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {Link} from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { usernameState} from './StateManager'


function Navigation () {
  const [activeItem, setActiveItem] = useState('home')

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }
  
  const [username, setUsername] = useRecoilState(usernameState)
  
  const handleLogout = () => { 
    window.localStorage.removeItem('scifanchain_username');
    window.localStorage.removeItem('scifanchain_access_token');
    setUsername('')
  }

  

  return (
    <Menu pointing violet >
      {/* <Image src={`${process.env.PUBLIC_URL}/assets/scifanchain_logo_black_white.png`} size='mini' /> */}
      <Menu.Item header>赛凡链</Menu.Item>
      <Menu.Item as={Link} to='/'
        name='home'
        active={activeItem === 'home'}
        content="首页"
        onClick={handleItemClick}>
      </Menu.Item>
      <Menu.Item as={Link} to='/galaxy'
        name='银河书'
        active={activeItem === '银河书'}
        onClick={handleItemClick}>
      </Menu.Item>
      {/* <Menu.Item as={Link} to='/about'
        name='纪元'
        active={activeItem === '纪元'}
        onClick={handleItemClick}>
      </Menu.Item> */}
      <Menu.Item as={Link} to='/create'
        name='创作营地'
        active={activeItem === '创作营地'}
        onClick={handleItemClick}>
      </Menu.Item>
      {/* <Menu.Item as={Link} to='/community'
        name='社区治理'
        active={activeItem === '社区治理'}
        onClick={handleItemClick}>
      </Menu.Item> */}
      <Menu.Item as={Link} to='/finance'
        name='链上信息'
        active={activeItem === '链上信息'}
        onClick={handleItemClick}>
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
              <Dropdown.Item onClick={handleLogout}>
                  退出
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        }
        {!username &&
          <Menu.Item as={Link} to='/sign-in'
            name='登录'
            active={activeItem === '登录'}
            onClick={handleItemClick}>
          </Menu.Item>
        }
        {!username &&
          <Menu.Item as={Link} to='/sign-up'
            name='注册'
            active={activeItem === '注册'}
            onClick={handleItemClick}>
          </Menu.Item>
        }
      </Menu.Menu>
    </Menu>
  )
}

export default Navigation
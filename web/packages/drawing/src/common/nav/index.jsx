import React from 'react';
import navItemList from 'config/nav'
import List from '../nav-list'
import './nav'

const Nav = () => (
    <nav className="nav">
        <List data={navItemList} />
    </nav>
)

export default Nav

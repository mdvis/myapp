import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavList = ({ data }) => (
    <ul>
        {data.map((cur, ind) => {
            const { name, value } = cur
            return (<li key={`nav-list${ind}`}><Link replace to={value}>{name}</Link></li>)
        })}
    </ul>
)

NavList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
    }))
}

NavList.defaultProps = {
    data: [{ value: '/', name: '' }]
}

export default NavList

import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Sider, Content } = Layout

function Root({ sider, content }) {
    return (
        <Layout>
            <Sider>{sider}</Sider>
            <Content>{content}</Content>
        </Layout>
    )
}

Root.propTypes = { 
    sider: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
}

export default Root

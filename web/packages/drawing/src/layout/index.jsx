import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import 'common/css'

const { Header, Content } = Layout

function Root({ header, content }) {
    return (
        <Layout>
            <Header>{header}</Header>
            <Layout>
                <Content>{content}</Content>
            </Layout>
        </Layout>
    )
}

Root.propTypes = { 
    header: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
}

export default Root

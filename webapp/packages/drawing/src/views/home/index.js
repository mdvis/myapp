import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HomeLayout from 'app/layout/home'
import Sider from 'common/sider'
import HomeRoot from '../../router/home'
import { showMoreHomeActionCreator } from './homeRedux'

function Home({ showMoreHome }){
    return (
        <HomeLayout
            sider={<Sider />}
            content={<HomeRoot showMoreHome={showMoreHome} />}
        />
    )
}

Home.propTypes = {
    showMoreHome: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    setShowMoreHome: state.setShowMoreHome,
})
const mapDispatchToProps = dispatch => ({
    showMoreHome: (payload) => { dispatch(showMoreHomeActionCreator(payload)) }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))

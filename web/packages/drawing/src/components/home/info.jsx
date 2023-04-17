import React from 'react';
import { connect } from 'react-redux'
import { showMoreHomeActionCreator } from '../../views/home/homeRedux'

function Info(){
    return (
        <div>info</div>
    )
}

const mapStateToProps = state => ({
    setShowMoreHome: state.setShowMoreHome,
})
const mapDispatchToProps = dispatch => ({
    showMoreHome: (payload) => { dispatch(showMoreHomeActionCreator(payload)) },
})
export default connect(mapStateToProps, mapDispatchToProps)(Info)

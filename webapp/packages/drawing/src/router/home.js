import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import url from 'config/url'
import Info from 'components/home/info'
import Profile from 'components/home/profile'

function RouteList(){
    return (
        <Switch>
            <Route exact path={url.info.path} component={Info} />
            <Route exact path={url.profile.path} component={Profile} />
            <Redirect to={url.info.path} />
        </Switch>
    )
}

export default RouteList

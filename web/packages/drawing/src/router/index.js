import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import url from 'config/url'
import Home from 'views/home'
import DrawingBoard from 'views/drawing-board'
import FLIP from 'views/flip'
import G6 from 'views/g6'
import Cytoscape from 'views/cytoscape'
import Timeline from 'views/timeline'
import Vis from 'views/vis'

function RouteList(){
    return (
        <Switch>
            <Route path={url.home.path} component={Home} />
            <Route path={url.drawingBoard.path} component={DrawingBoard} />
            <Route path={url.flip.path} component={FLIP} />
            <Route path={url.g6.path} component={G6} />
            <Route path={url.cytoscape.path} component={Cytoscape} />
            <Route path={url.timeline.path} component={Timeline} />
            <Route path={url.vis.path} component={Vis} />
            <Redirect to={url.timeline.path} />
        </Switch>
    )
}

export default RouteList

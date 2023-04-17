/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Timeline from './timeline';

const ref = React.createRef();
const CANVAS_HEIGHT = 300;

function TimelineContainer({ data, onClick }) {
    useEffect(() => {
        const dom = ref.current;
        Timeline.init({
            container: dom,
            data,
            onClick,
            config: { height: CANVAS_HEIGHT },
        });
    }, []);

    return (
        <div
            id="container"
            ref={ref}
            style={{ border: '1px solid red' }}
        />
    );
}

TimelineContainer.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({})),
        edges: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default TimelineContainer;

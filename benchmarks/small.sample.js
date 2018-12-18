/*
    SAMPLE CODE EXAMPLE FOR RUNNING BENCHMARKS
    USED IN ANY PART BY ESLINT-PLUGIN-7G
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SweetClassLabel = (props) => {
    if (props.hasNoName) {
        return null;
    }
    switch(props.action) {
        case 'renderSomethingElse':
            return (
                <div className="something-else">
                    Something else!
                </div>
            );
    }
    return (
        <div className="label">
            {SG.user.getFullName()}
        </div>
    );
};

class SweetClass extends Component {
    static propTypes = {
        nice: PropTypes.bool,
        onChange: PropTypes.bool,
    };

    niceGutterisActive = SG.network.isGutterFeatureActive('nice');

    render() {
        return this.niceGutterisActive ? (
            <div className="sweet">
                <SweetClassLabel />
                <input type="text" />
            </div>
        ) : null;
    }

};

export default SweetClass;

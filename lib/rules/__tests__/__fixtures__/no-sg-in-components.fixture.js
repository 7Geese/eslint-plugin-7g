const marionetteClassUsingSG = `
class Controller extends Marionette.Controller {

    initialize() {
        ReactDOM.render(
            React.createElement(NavbarContainer),
            document.getElementById('header')
        );
        this.navView = new NavView({app: this.options.app});

        if (SG.user.isActive()) {
            const view = new NotificationsDropdown();
            $('#nav-notifications').html(view.el);
            view.listenForNewNotifications();
        }
    }
}
`;

const componentUsingSG = `
import React, { Component } from 'react';


class SweetComponent extends Component {

        aMethod = () => {
            return SG.network.id;
        }

        //  SG is cool!
        someFunc() {
            return SG.network.isGutterFeatureActive('gutty');
        }

        render() {
            return SG.user.id;
        }
}
`;

const functionUsingSG = `
const someFunction = () => {
    return SG.user.getFullName();
};
`;

const functionComponentUsingSG = `
import React from 'react';

const SweetComponent = () => {
    return (
        <div>
            My name is {SG.user.getFullName()}
        </div>
    );
};

export default SweetComponent;
`;

const functionsWithConditionals = `
import React from 'react';

const SweetComponent = (props) => {
    if (props.someProp) {
        return (
            <div>
                {SG.user.getFullName()}
            </div>
        );
    }
    switch (prop.otherProp) {
        case 'yo sick':
            return SG.user.getFullName();
        default:
            return (<div />);
    }
    return null;
};
`;

const moreComplexFunctionUsingSG = `
import React from 'react';

const SweetComponent = () => {
    const greeter = () => {
        const startText = 'hello ';
        return (name) => {
            return startText + name + ', you are a part of the ' + SG.network.get('name')
        };
    };
    return (
        <div>
            {greeter()(SG.user.getFullName())}
        </div>
    );
};
`;

module.exports = {
    validExamples: {
        marionetteClassUsingSG,
        functionUsingSG,
    },
    invalidExamples: {
        componentUsingSG,
        functionComponentUsingSG,
        functionsWithConditionals,
        moreComplexFunctionUsingSG,
    },
};

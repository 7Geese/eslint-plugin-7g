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

module.exports = {
    validExamples: {
        marionetteClassUsingSG,
    },
    invalidExamples: {
        componentUsingSG,
        functionComponentUsingSG,
    },
};

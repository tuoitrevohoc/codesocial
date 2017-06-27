import * as React from "react";
import * as ReactDOM from "react-dom";
import {UserService} from "services";

/**
 * The application
 */
interface ApplicationState {
    message?: string
}

/**
 * the application class
 */
class Application extends React.Component<{}, ApplicationState> {

    /**
     * default state
     * @type {{}}
     */
    state: ApplicationState = {};

    /**
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        let message = await UserService.helloWorld();
        this.setState({message});
    }

    render() {
        return <div>{this.state.message}</div>
    }
}

/**
 * initialize an application
 */
export default function main() {
    ReactDOM.render(
        <Application />,
        document.getElementById("root"));
}

main();
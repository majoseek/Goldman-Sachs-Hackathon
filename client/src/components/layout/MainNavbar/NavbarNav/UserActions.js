import React from "react";
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavItem,
    NavLink,
} from "shards-react";
import userAvatar from "./man.png";

export default class UserActions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };

        this.toggleUserActions = this.toggleUserActions.bind(this);
    }

    toggleUserActions() {
        this.setState({
            visible: !this.state.visible,
        });
    }

    render() {
        return (
            <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                <DropdownToggle
                    caret
                    tag={NavLink}
                    className="text-nowrap px-3"
                >
                    <img
                        className="user-avatar rounded-circle mr-2"
                        src={userAvatar}
                        alt="User Avatar"
                    />{" "}
                    <span className="d-none d-md-inline-block">
                        Nazwa projektu
                    </span>
                </DropdownToggle>
                <Collapse
                    tag={DropdownMenu}
                    right
                    small
                    open={this.state.visible}
                >
                    <DropdownItem tag={Link} to="edit-user-profile">
                        <i className="material-icons">&#xE8B8;</i> Change
                        project directory
                    </DropdownItem>
                </Collapse>
            </NavItem>
        );
    }
}

import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from "styled-components";
import {colors} from "../colors";
import { connect } from 'react-redux';


const NavStyle = styled.nav`
    position:fixed;
    top:0;
    left:50%;
    transform:translate(-50%, -50%);
    margin: 32px auto;
    a{
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        font-size:1.5rem;
        padding-right: 35px;
        border-bottom: 2px solid #efefef;
    }
    a:last-of-type {
        margin-right: 0;
    }
    a:hover{
        color:${colors.mint};
        border-bottom: 2px solid ${colors.mint};
    }
`



const Navigation = ({ user }) => {
    let organizationTab;
    let signupTab = <NavLink exact to="/"> Sign Up </NavLink>;

    if(user && user.userroles[1].role.name == "organization"){
        organizationTab = <NavLink exact to="/organization"> Organization </NavLink>
        signupTab = ""
    }


    return (
        <NavStyle>
            <div className="nav-links">
                <a href="https://romantic-johnson-6f5765.netlify.com/aboutus"> About Us </a>
                <NavLink exact to="/campaigns"> Campaigns </NavLink>
                <a href="https://romantic-johnson-6f5765.netlify.com"> Home </a>
                {organizationTab}
                {signupTab}   
            </div>
        </NavStyle>
    )
}

export default connect(state => {
    return { user: state.login.user }
})(Navigation);
import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import {colors} from "../../colors";


const LoginFormStyle = styled.div`
    section {
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-around;
        background:#0005;
        border-radius:20px;
        height:60vh;
        width: 400px;
        margin: auto 100px;
        padding: 32px;
        font-weight: bold;
        box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        h1{
            font-family: 'Noto Serif', serif;
            text-shadow:2px 6px 3px black;
            color:white;
            font-size:2rem;
            margin:0;
        }
        h2{
            font-size:1.2rem;
            text-shadow:2px 6px 3px black;
            color:#ddd;
            font-family: 'Noto Serif', serif;
        }
        button{
            cursor: pointer;
            box-sizing:border-box;
            height:50px;
            padding:15px 60px;
            font-family: 'Roboto', sans-serif;
            border:none;
            border-radius:25px;
        }
        .primary{
            background:${colors.mint}
        }
        .primary:hover{
            background:transparent;
            border:2px solid ${colors.mint};
            color:${colors.mint};
        }
        .alt{
            background:transparent;
            border:2px solid ${colors.mint};
            color:${colors.mint};
        }
        .alt:hover{
            background:${colors.mint};
            color:black;
        }
    }
`

export const LoginLanding = (props) => {

    return (
        <LoginFormStyle className="login-form">
            <section>              
                <h1>Save The Animals</h1>

                <div>

                    <h2>I Am A Global Supporter</h2>
                    <Link to="/signup/supporter">
                        <button className="primary" type="submit">Supporter <i className="fas fa-gift"></i></button>
                    </Link>
                
                    <h2>I Am A Conservation Organization</h2>
                    <Link to="/signup/organization">
                        <button className="alt" type="submit">Organization <i className="fas fa-globe"></i></button>
                    </Link>
                
                    <h2>Already Have An Account?</h2>
                    <Link to="/signup/login">
                        <button className="alt" type="submit">Login <i className="fas fa-user-circle"></i></button>
                    </Link>

                </div>
             
               </section>
        </LoginFormStyle>
    );
};

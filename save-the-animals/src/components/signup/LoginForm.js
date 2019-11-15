import React,{useEffect} from 'react';
import {withFormik, Field,Form} from 'formik';
import styled from "styled-components";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import {colors} from '../../colors';
import { connect } from 'react-redux';
import { doLogin } from '../../actions/Campaigns';


const LoginFormStyle = styled.div`
    form {
        display:flex;
        flex-direction:column;
        align-items:center;
        background:#0005;
        border-radius:20px;
        width: 400px;
        margin: auto 100px;
        padding: 32px;
        font-weight: bold;
        box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        h1{
            font-family: 'Noto Serif', serif;
        }
        h2{
            font-size:1.2rem;
            color:#ddd;
            font-family: 'Noto Serif', serif;
        }
        label{
            font-size:1.2rem;
            color:#ddd;
            font-family: 'Noto Serif', serif;
        }
        button{
            cursor: pointer;
            box-sizing:border-box;
            height:50px;
            padding:15px 60px;
            font-family: 'Roboto', sans-serif;
            margin: 32px 0;
            border:none;
            border-radius:25px;
        }
        input{
            box-sizing:border-box;
            height:50px;
            min-width:85%;
            padding:15px 20px;
            font-family: 'Roboto', sans-serif;
            border:2px solid #fff2;
            border-radius:25px;
            background:#353583;
            margin: 22px 0;
            color:white;
        }
        input::placeholder{
            color:white;
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

function LoginForm({status,doLogin}){

    useEffect(()=>{
        if(status){
            doLogin(status)
        }
    },[status])


    return(
        <LoginFormStyle>
            <Form>
                <h1>Log In</h1>
                <label >
                    Enter Username:
                <Field type="text" name="username" placeholder="User Name"/>
                </label>

                <label >
                    Enter Password:
                <Field type="password" name="password" placeholder="Password"/>
                </label>

                <button className="alt" type="submit">Login <i className="fas fa-user-circle"></i></button>
            </Form>
        </LoginFormStyle>
    )
}

const LocalLoginFormik = withFormik({
    mapsPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        };
    },
    validationSchema: Yup.object().shape({
        userName: Yup.string().required(''),
        password: Yup.string().required()
    }),
    handleSubmit({username,password},{setStatus}){
        setStatus({username,password})
    }

    
})(LoginForm);

export const LoginFormik = connect((state) => {
    return { ...state.login };
}, { doLogin })(LocalLoginFormik);
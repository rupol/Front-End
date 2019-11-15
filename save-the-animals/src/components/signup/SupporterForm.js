import React from "react";
import {withFormik, Field, Form} from "formik";
import styled from "styled-components";
import {colors} from '../../colors';
import { connect } from 'react-redux';
import { createUser } from '../../actions/Campaigns';

const SupporterFormStyle = styled.section`
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

function SupporterForm({doLogin}){
    return(
        <SupporterFormStyle>
            <Form>
                <label >
                    Enter New Username:
                    <Field type="text" name="username" placeholder="username"></Field>
                </label>

                <label>
                    Enter New Password:
                    <Field type="password" name="password" placeholder="password"></Field>
                </label>

                <label>
                    Enter Your Email
                    <Field type="email" name="email" placeholder="Email"></Field>
                </label>

                <button className="alt" type="submit">Submit <i className="fas fa-user-circle"></i></button>
            </Form>
        </SupporterFormStyle>
    )
}

const LocalSupporterFormik = withFormik({
    mapPropsToValues(val){
        return {
            username:val.username || "",
            password:val.password || "",
            role: "supporter",
            email:val.email || ""
        }
    },
    handleSubmit(values,{props}){

        let user = {
            username:values.username,
            password:values.password,
            userroles:[
                {
                    "role": {
                        "roleid": 2,
                        "name": "data"  
                    }
                },
                {
                    "role": {
                        "roleid": 4,
                        "name": values.role
                    }
                }
            ],
            useremails: [
                {
                    useremail: values.email
                }
           
            ]
        }
        
        props.createUser(user);
    }

})(SupporterForm);

export const SupporterFormik = connect(null, { createUser })(LocalSupporterFormik);
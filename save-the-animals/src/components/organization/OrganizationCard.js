import React from 'react';
import styled from "styled-components";
import {userCard} from '../campaign/UserCard';
import { connect } from 'react-redux';
import {colors} from "../../colors"; 
import { updateCampaign, deleteCampaign } from '../../actions/Campaigns';

const OrganizationCardStyle = styled.aside`
    width:32%;
    min-height:300px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    background:#353583;
    border-radius:25px;
    margin-bottom:25px;
    *{
        color:white;
        text-align:center;
    }
    p{
        font-family:Roboto, monospace;
    }
    h1{
        font-family:Noto Serif,cursive;
    }
    img{
        width:250px; 
        height:250px; 
        border-radius:50%;
        object-fit:cover;
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
        background:${colors.mint};
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
    input {
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
`


function OrganizationCard(props) {

    function handleEdit(){
        props.setForm(props)
    }

    function handleDelete(){

    }
    
    return (
    <OrganizationCardStyle>
            <h1>{props.title}</h1>
            <img src={props.photo} alt=""/>
            <p>{props.description}</p>
            

            <div>
                <button onClick={()=>handleEdit()}>Edit <i className="fas fa-edit"></i></button>
                <button onClick={()=>handleDelete()}>Delete <i className="fas fa-trash"></i></button>
            </div>
    </OrganizationCardStyle>
    )
}

export default connect(null, { updateCampaign, deleteCampaign })(OrganizationCard);
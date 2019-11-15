import React from "react";
import {withFormik,Field,Form} from "formik";
import {colors} from '../../colors';
import styled from "styled-components";
import { connect } from 'react-redux';
import { addCampaign } from '../../actions/Campaigns';

const CampaignFormStyle = styled.div`
    display:flex;
    align-items:flex-start;
    h1{
        color:${colors.teal};
        font-size:2.5rem;
        background-color:#353583;
        padding:30px;
        border-right:8px solid ${colors.mint};
        margin-right:15px;
        text-shadow:2px 6px 3px black;
    }
    form {
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        align-items:center;
        background:#0005;
        border-radius:20px;
        width: 90%;
        padding: 32px;
        font-weight: bold;
        box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        h1{
            font-family: 'Noto Serif', serif;
            text-shadow:2px 6px 3px black;
        }
        h2{
            font-size:1.2rem;
            color:#ddd;
            font-family: 'Noto Serif', serif;
            text-shadow:2px 6px 3px black;
        }
        label{
            font-size:1.2rem;
            color:#ddd;
            font-family: 'Noto Serif', serif;
            text-shadow:2px 6px 3px black;
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

function CampaignForm(props){
    return (
        <CampaignFormStyle> 
         
            <h1>Add New Campaign</h1>
          
            <Form>
                <label >
                    Enter Title:
                    <Field type="text" name="title" placeholder="Title" value={props.title}/>
                </label>

                <label >
                    Enter Location:
                    <Field type="text" name="area" placeholder="Location" value={props.area}/>
                </label>

                <label >
                    Enter Description:
                    <Field type="text" name="description" placeholder="Description" value={props.description}/>
                </label>

                <label >
                    Enter Species:
                    <Field type="text" name="species" placeholder="Species" value={props.species}/>
                </label>

                <label >
                    Enter Urgency Level:
                    <Field type="text" name="urgency" placeholder="Urgency" value={props.urgency}/>
                </label>

                <label >
                    Enter Deadline:
                    <Field type="date" name="deadline" placeholder="Deadline" value={props.deadline}/>
                </label>
                
                
                <label>
                    Itemized Monetary Donations:
                    <Field type="number" name="donations" placeholder="Donations" value={props.donations}/>
                </label>

                <label >
                    Enter Funding Goal:
                    <Field type="number" name="funding" placeholder="Funding" value={props.funding}/>
                </label>

                <label >
                    Add a Photo:
                    <Field type="text" name="photo" value={props.photo} placeholder="Photo"/>
                </label>

                <button type="submit">Submit <i className="fas fa-user-circle"></i></button>
                
            </Form>
        </CampaignFormStyle> 
    )
}

const LocalCampaignFormik = withFormik({
    mapPropsToValues(val){
        return {
            title:val.title || "",
            area:val.area || "",
            deadline: val.deadline || "",
            description:val.description || "",
            species:val.species || "",
            urgency:val.urgency || "",
            donations:val.donations || 0,
            funding:val.funding || 0,
            photo:val.photo || "https://images.pexels.com/photos/148182/pexels-photo-148182.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        }
    },
    handleSubmit(values, { props }){
        
        let formattedValues = {
            "title": values.title,
            "photo": values.photo,
            "location": values.area,
            "description": values.description,
            "species": values.species,
            "urgency": values.urgency,
            "donations": values.donations,
            "funding_goal": values.funding,
            "deadline": values.deadline
        }

        props.addCampaign(formattedValues);
    }
})(CampaignForm)

export const CampaignFormik = connect(null, { addCampaign })(LocalCampaignFormik);
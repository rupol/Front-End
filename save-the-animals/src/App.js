import React,{useState,useEffect} from 'react';
import { Route } from 'react-router-dom';
import styled from "styled-components";
import { getUserInfo } from './actions';

import Navigation from './components/Navigation';
import {LoginLanding} from './components/signup/LoginLanding';
import {LoginFormik} from './components/signup/LoginForm';
import {SupporterFormik} from './components/signup/SupporterForm';
import {OrganizationFormik} from './components/signup/OrganizationForm';
import {CampaignPage} from './components/campaign/CampaignPage';
import {OrganizationPage} from './components/organization/OrganizationPage';


const AppStyle = styled.div`
  height:100%;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  position:relative;
  overflow-x:hidden;
  #back{
    width:100vw;
    height:100vh;
    z-index:-2;
    position:fixed;
    top:0;
    left:0;
    background:black;
    display:flex;
    align-items:center;
    justify-content:center;
    video{
      width:100vw;
    }
  }
`



function App({ store }){

  const [formValues,setFormValues] = useState();

  useEffect(() => {
    store.dispatch(getUserInfo());
  });

  return (
    <AppStyle className="App">

      <section id="back">
        <video muted autoPlay loop src={require("./background.mp4")}></video>
      </section>
      
      <Navigation />

      
      <Route exact path="/" component={LoginLanding}/>          
      <Route exact path="/organization" render={()=> <OrganizationPage form={formValues} setForm={setFormValues}/>  }></Route>
      <Route exact path="/campaigns" render={(props)=>{return <CampaignPage {...props}></CampaignPage>  }}></Route>
      <Route exact path="/signup/supporter" component={SupporterFormik}/>
      <Route exact path="/signup/organization" component={OrganizationFormik}/>
      <Route exact path="/signup/login" component={LoginFormik}/>

    </AppStyle>
  );
}

export default App;
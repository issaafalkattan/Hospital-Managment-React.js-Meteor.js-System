import React , { Component }from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput } from 'mdbreact';
import { message } from 'antd';
import { navigate } from '@reach/router';
class FormPage extends Component {

     state={
         user : '',
         password : ''
     }
     login = () => {
         console.log("loggin in")
         let username = this.state.user;
         let password = this.state.password;
        Meteor.loginWithPassword(username, password, (err) => {

            if(err){
               message.warning(err.reason)
           

            }
            else {
                navigate("/");
                location.reload();

            }
        });

     }
    render(){
  return (
      <div className="loginPage">
    <MDBContainer>
      <MDBRow>
          <MDBCol md="3" />
        <MDBCol md="6" style={{paddingTop: "15%",}}>
          <MDBCard
            className="card-image"
            style={{
              backgroundImage:
                "url(https://webgradients.com/public/webgradients_png/034%20Lemon%20Gate.png)",
              width: "100%"
            }}
          >
            <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
              <div className="text-center">
                <h3 className="white-text mb-5 mt-4 font-weight-bold">
                  <strong>Hopsital</strong>
                  <a href="#!" className="green-text font-weight-bold">
                    <strong> A.A.I.L</strong>
                  </a>
                </h3>
              </div>
              <MDBInput label="Your Username" group type="text" validate onChange={(a) => this.setState({user : a.currentTarget.value})}/>
              <MDBInput label="Your Password" group type="password" validate onChange={(a) => this.setState({password : a.currentTarget.value})}/>
              <MDBRow className="d-flex align-items-center mb-4">
                <div className="text-center mb-3 col-md-12">
                  <MDBBtn
                    color="success"
                    rounded
                    type="button"
                    className="btn-block z-depth-1"
                    onClick={() => this.login()}
                  >
                    Sign in
                  </MDBBtn>
                </div>
              </MDBRow>
            </div>
          </MDBCard>
        </MDBCol>
        <MDBCol md="3" />

      </MDBRow>
    </MDBContainer>
    </div>
  )
        }}

export default FormPage;
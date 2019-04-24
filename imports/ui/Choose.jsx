import React, { Component } from 'react'
import {  MDBRow, MDBCol, MDBIcon } from "mdbreact";

class componentName extends Component {
  render() {
    return (
        <div className="greenBg">
        <section className="text-center my-5">
        <h2 className="h1-responsive font-weight-bold my-5">
           <img src="./logo2.png" style={{ height : "300px", alignSelf: 'center',}}/>
        </h2>
        <p className="lead grey-text w-responsive mx-auto mb-5">
          Please select a view.
        </p>
        <MDBRow style={{marginLeft : '10%', marginRight : '10%'}}>
          <MDBCol md="6">
            <a href="/view"><MDBIcon icon="procedures" size="6x" className="red-text" />
            <h5 className="font-weight-bold my-4">Patients View</h5>
            </a>
          </MDBCol>
          
          <MDBCol md="6">
            <a href="/login"><MDBIcon icon="user-nurse" size="6x" className="cyan-text" />
            <h5 className="font-weight-bold my-4">Nurse View</h5>
            </a>
          </MDBCol>

        </MDBRow>
      </section>
      </div>
    )
  }
}

export default componentName

import React, { Component } from 'react'
import {
    Layout, Menu, Breadcrumb, Icon, Col, Button,
  } from 'antd';
import {Link, Router} from '@reach/router'
import ListPatients from './listPatients';
import CreatePatient from './createPatient';
import Appointments from './Appointments';
import Doctors from './Doctors';
import Invoices from './Invoice';

const SubMenu = Menu.SubMenu;
  const {
    Header, Content, Footer, Sider,
  } = Layout;
class Main extends Component {
    state={
        sideNavLeft :false,
    }
  render() {
    return (
        <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="80"
          style={{background: '#2BBBAD'}}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} style={{fontWeight: "bold", color : "white", height :"100vh", background : "#2BBBAD"}}>
          <SubMenu key="sub1" title={<span><Icon type="user" /><span>Patient Records</span></span>} style={{fontWeight : 'bold', paddingTop : '20%'}}>
            <Menu.Item key="5"><Link to="/add-patient" ><Icon type="user-add" />Create Patient</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/patients"><Icon type="ordered-list" />List Patients</Link></Menu.Item>
          </SubMenu>
          <Menu.Item style={{paddingBottom : '20%'}} key="7"><Link to="/appointments" style={{color : 'white'}}><Icon type="schedule" />Appointments</Link></Menu.Item>
          <Menu.Item  key="8"><Link to="/doctors" style={{color : 'white'}}>    <i class="fas fa-user-md" style={{marginRight : "5px"}}/>
Doctors</Link></Menu.Item>
<Menu.Item  key="9"><Link to="/invoices" style={{color : 'white'}}>    <i class="fas fa-file-invoice" style={{marginRight : "5px"}}/>
Invoices</Link></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#2BBBAD', padding: 0 }} >
          <Col span={20} >
     <img style={{height : "200px", marginTop : '-60px'}} src="./logo2.png" />
          </Col>
          <Col span={4}>
          <Button type="danger" onClick={() => {Meteor.logout();         location.reload();}}>Log Out</Button>
          </Col>
          </Header>
          <Content style={{minHeight :"100vh"}}>
          <Router>
              <ListPatients path="/patients"/>
              <CreatePatient path="/add-patient" />
              <CreatePatient path="/add-patient/:id" />
         
              <Appointments path="/appointments" />
              <Doctors path="/doctors" />
              <Invoices path="/invoices" />
          </Router>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            AAIL @2019
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Main

import React, { Component } from "react";
import {
  Table,
  Divider,
  Tag,
  Popconfirm,
  Card,
  Button,
  Icon,
  Input,
  message
} from "antd";
import Highlighter from "react-highlight-words";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import CreateAppointment from "./CreateAppointment";
import { withTracker } from "meteor/react-meteor-data";
import { Appointment } from "../api/appointment";
import moment from "moment";
import InvoiceTemplate from './InvoiceTemplate';
import { MDBBadge, MDBBtnGroup } from "mdbreact";

import { Patient } from "../api/patient";
import { Invoice } from "../api/invoice";
import { CreateInvoice } from "./CreateInvoice";
export class Appointments extends Component {
  state = {
    searchText: "",
    open: false,
    showIn: false,
    record : {},
  };

  calculateLateFee = (record) => {
    let fee = 0;
    if(record){
    if (record.status == "Late") {
      var now = moment(new Date()); //todays date
      var end = moment(record.dueDate); // another date
      var duration = moment.duration(now.diff(end));
      console.log("Late days", duration.days())
      fee = duration.days() * (this.calculateTotal(record) * 0.01);
    }
}
    return fee;
  };
  calculateTotal = (record) => {
    let total = 0;
    if(record){
    if (record.items) {
        record.items.map(a => {
        total += a.price;
      });
    }
}
    return total;
  };
  downloadTxtFile = (data) => {
    const element = document.createElement("a");
    const file = new Blob([data], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "token.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  getStatus = record => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (record.dueDate < today) {
       if(record.status != "Late"){
        record.late();
       } 
      return <MDBBadge color="warning">Late</MDBBadge>;
    } else {
      if (record.status == "In Progress") {
        return <MDBBadge color="primary">In Progress</MDBBadge>;
      }
      if (record.status == "Paid") {
        return <MDBBadge color="danger">Paid</MDBBadge>;
      }
    }
  };
  returnActions = record => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (record.status == "In Progress" && record.dueDate > today) {
      return (
        <span>
          <MDBBtnGroup>
            <MDBBtn color="danger" size="sm" onClick={() => record.paid()}>
              Set Paid
            </MDBBtn>
            <MDBBtn color="primary" size="sm" onClick={() => this.setState({showIn : true, record : record})}>
              Show Invoice
            </MDBBtn>
          </MDBBtnGroup>
        </span>
      );
    }
    else {
        return(
        <MDBBtn color="primary" size="sm" onClick={() => this.setState({showIn : true, record : record})}>
        Show Invoice
      </MDBBtn>
        );
    } 
}
  
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const columns = [
      {
        title: "Token",
        dataIndex: "_id",
        key: "_id",
        ...this.getColumnSearchProps("_id"),
        render: text => <a onClick={() => this.downloadTxtFile(text)}>{text}</a>,

      },
      {
        title: "Patient",
        dataIndex: "patient",
        key: "patient",
        ...this.getColumnSearchProps("patient")
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        key: "doctor",
        ...this.getColumnSearchProps("doctor")
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        key: "date",
        render: text => <h6>{moment(text).format("DD/MM/YYYY")}</h6>,
        defaultSortOrder: "descend",
        sorter: (a, b) => a.createdDate - b.createdDate
      },
      {
        title: "Due Date",
        dataIndex: "dueDate",
        key: "dueDate",
        render: text => <h6>{moment(text).format("DD/MM/YYYY")}</h6>,
        defaultSortOrder: "descend",
        sorter: (a, b) => a.dueDate - b.dueDate
      },
      {
          title : "Taxed total (+Late fees)",
          dataIndex: "dueDate",
          key:"total",
          render: (text,record)=><h6>${this.calculateTotal(record) + this.calculateLateFee(record)+ (this.calculateTotal(record)*0.1)}</h6>
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text, record) => this.getStatus(record)
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => this.returnActions(record)
      }
    ];
    return (
      <Card style={{ marginLeft: "5%", marginRight: "2%" }}>
        <MDBBtn color="info" onClick={() => this.setState({ open: true })}>
          Create Invoice
        </MDBBtn>

        <Table
          columns={columns}
          dataSource={this.props.data}
          rowKey={record => record._id}
        />
        <MDBModal isOpen={this.state.open} fullHeight position="bottom">
          <MDBModalHeader toggle={() => this.setState({ open: false })}>
            Invoice Creation
          </MDBModalHeader>
          <MDBModalBody>
            <CreateInvoice close={() => this.setState({ open: false })} thePatients={this.props.patients} isIt={this.props.ready2}/>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.setState({ open: false })}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBModal isOpen={this.state.showIn} fullHeight position="top">
          <MDBModalHeader toggle={() => this.setState({ showIn: false, record : [] })}>
            Invoice Creation
          </MDBModalHeader>
          <MDBModalBody>
            <InvoiceTemplate data={this.state.record}/>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.setState({ showIn: false, record : [] })}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </Card>
    );
  }
}
const Wrapper = withTracker(props => {
  const status = Meteor.subscribe("getInvoices");
  const status2 = Meteor.subscribe("getPatients");
  const data = Invoice.find({}).fetch();
  const data2 = Patient.find({}).fetch();
  const ready2 = status2.ready()

  const patients = [];
  if (ready2) {
    data2.map(a => patients.push(a.firstName + " " + a.lastName));
  }
  console.log("Got data", patients);
  const ready = status.ready();

  return {
    ...props,
    data,
    ready,
    patients,
    ready2
  };
})(Appointments);

export default Wrapper;

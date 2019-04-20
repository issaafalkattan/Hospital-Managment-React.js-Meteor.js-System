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
import { MDBBadge, MDBBtnGroup } from "mdbreact";

import { Patient } from "../api/patient";
export class Appointments extends Component {
  state = {
    searchText: "",
    open: false
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
    if (record.date < today) {
      return <MDBBadge color="warning">Expired</MDBBadge>;
    } else {
      if (record.status == "In Progress") {
        return <MDBBadge color="success">In Progress</MDBBadge>;
      }
      if (record.status == "Cancelled") {
        return <MDBBadge color="danger">Cancelled</MDBBadge>;
      }
      if (record.status == "Approved") {
        return <MDBBadge color="primary">Approved</MDBBadge>;
      }
    }
  };
  returnActions = record => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (record.status == "In Progress" && record.date > today) {
      return (
        <span>
          <MDBBtnGroup>
            <MDBBtn color="danger" size="sm" onClick={() => record.cancel()}>
              Cancel
            </MDBBtn>{" "}
            <MDBBtn
              size="sm"
              color="success"
              onClick={() => record.approve()}
            >
              Approve
            </MDBBtn>
          </MDBBtnGroup>
        </span>
      );
    } else if(record.status == "Approved"){

      return <Popconfirm nConfirm={() => record.cancel()} title="Are you sure you want to cancel this appointment?" okText="Yes" cancelText="No">
<MDBBtn color="danger" size="sm" onClick={() => record.cancel()}>
      Cancel
    </MDBBtn>

      </Popconfirm> 
    }
    else {
      return (
        <span>
          {" "}
          <MDBBtn color="warning" size="sm" onClick={() => {
            
            Meteor.call("appointments.remove", record._id, (err) => {
              if(err){
                message.error(error.reason)
              }
              else{
                message.success("Appointment deleted!")
              }
            })}
          }>
            Delete
          </MDBBtn>
        </span>
      );
    }
  };
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
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
        ...this.getColumnSearchProps("reason")
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: text => <h6>{moment(text).format("DD/MM/YYYY")}</h6>,
        defaultSortOrder: "descend",
        sorter: (a, b) => a.dateOfAdmission - b.dateOfAdmission
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
          Add Appointment
        </MDBBtn>

        <Table
          columns={columns}
          dataSource={this.props.data}
          rowKey={record => record._id}
        />
        <MDBModal isOpen={this.state.open} fullHeight position="bottom">
          <MDBModalHeader toggle={() => this.setState({ open: false })}>
            MDBModal title
          </MDBModalHeader>
          <MDBModalBody>
            <CreateAppointment close={() => this.setState({ open: false })} />
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
      </Card>
    );
  }
}
const Wrapper = withTracker(props => {
  const status = Meteor.subscribe("getApp");
  const status2 = Meteor.subscribe("getPatients");
  const data = Appointment.find({}).fetch();
  const patients = Patient.find({}).fetch();
  console.log("Got data", data);
  const ready = status.ready();

  return {
    ...props,
    data,
    ready,
    patients
  };
})(Appointments);

export default Wrapper;

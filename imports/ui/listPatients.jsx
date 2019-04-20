import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Divider, Tag, Popconfirm, Card, Button, Icon, Input } from 'antd';
import { Patient } from '../api/patient';
import moment from 'moment';
import {Link} from '@reach/router'
import Highlighter from 'react-highlight-words';

    
export class listPatients extends Component {
    state = {
        searchText : '',
    }
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
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
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      })
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
      handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
      }
  render() {
    const columns = [{
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'fname',
        ...this.getColumnSearchProps('firstName'),

  
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lname',
        ...this.getColumnSearchProps('lastName'),

  
      },
      {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        ...this.getColumnSearchProps('phoneNumber'),

  
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <a href={`mailto:${text}subject = Feedback&body = Message`}>{text}</a>,


  
      },
      {
        title: 'Date Of Admision',
        dataIndex: 'dateOfAdmission',
        key: 'date',
        render: (text) => <h6>{moment(text).format('DD/MM/YYYY')}</h6>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.dateOfAdmission - b.dateOfAdmission,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>

            <Link to={`/add-patient/${record._id}`}>View</Link>
   
          </span>
        ),
      }];
   
    return (
        <Card style={{marginLeft : '5%', marginRight : '2%'}} loading={!this.props.ready}>
           <Table columns={columns} dataSource={this.props.data} rowKey={record => record._id}/>
      
      </Card>
    )
  }
}

const ViewArticlesWrapper = withTracker((props) => {
    const status = Meteor.subscribe('getPatients');
    const data = Patient.find({}).fetch();
    const ready = status.ready();
    return {
      data,
      ready,
      ...props,
  
    };
  })(listPatients);
   
  export default ViewArticlesWrapper;
  
import React, { Component } from 'react'
import { Table, Divider, Tag, Popconfirm, Card, Button, Icon, Input } from 'antd';
import axios from 'axios';
import Highlighter from 'react-highlight-words';

export class Doctors extends Component {

  componentWillMount() {
    axios.get('./doctors.json') // JSON File Path
      .then( response => {
        this.setState({
        data: response.data
      });
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
   }
    state = {
        searchText : '',
        data : [],
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
        dataIndex: 'first_name',
        key: 'first_name',
        ...this.getColumnSearchProps('first_name'),

  
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        ...this.getColumnSearchProps('last_name'),

  
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <a href={`mailto:${text}subject = Feedback&body = Message`}>{text}</a>,

  
      },
      {
        title: 'Phone number',
        dataIndex: 'phone_number',
        key: 'phone_number',
        ...this.getColumnSearchProps('phone_number'),

  
      },];
    return (
        <Card style={{marginLeft : '5%', marginRight : '2%'}} >
        <Table columns={columns} dataSource={this.state.data} rowKey={record => record._id}/>
   
   </Card>
    )
  }
}

export default Doctors

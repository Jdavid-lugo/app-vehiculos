
import React,{Component} from 'react';
import reqwest from 'reqwest';
import ModalModificar from './ModalModificar';
import {Table, Input, Button, Icon,Divider} from 'antd';

const columns = [{
  title: 'Marca',
  dataIndex: 'brand',
  sorter: true,
  width: '20%',
}, {
  title: 'Model',
  dataIndex: 'model',
  width: '20%',
}, {
  title: 'Maxima Velocidad',
  dataIndex: 'max_speed',
}, {
  title: 'Año de Fabricación',
  dataIndex:'year'
}, {
  title: 'Pais de Fabricación',
  dataIndex: 'made_in',
}, {
    title: 'Accion',
    key: 'id',
    render: (text, record) => (
      <span>
        <ModalModificar datos={record} />
        <Divider type="vertical" />
        <a ><Icon type='delete'/></a>
      </span>
    ),
    width: '10%'  
},];

class Manager extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    
    this.setState({ loading: true });
    reqwest({
      url: 'http://localhost/apiCar.php',
      method: 'get',
      data: {
        results: 10,
        accion:'consulta',
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.cars,
        pagination,
      });
    });
  }

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}


export default Manager;
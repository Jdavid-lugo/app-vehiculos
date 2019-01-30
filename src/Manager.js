
import React,{Component} from 'react';
import {Table, Divider} from 'antd';
import reqwest from 'reqwest';
import CarroModificarModal from './CarroModificarModal';
import CarroEliminar from './CarroEliminar';
import CarroNuevoModal from "./CarroNuevoModal";
import { Link} from "react-router-dom";


class Manager extends Component {

  constructor(props){
    super(props);
    this.state = {
      auth:props.auth,
      data: [],
      pagination: {},
      loading: false,
      actualizar:false
    };

  }
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
        accion:'consulta',
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
       //pagination.total = data.totalCount;
      pagination.total = 1;
      this.setState({
        loading: false,
        data: data.cars,
        pagination,
      });
    });
  }

  actualizarT = ()=>{ 
    this.fetch();
  }

  inhabilitar = (params)=>{ 

  }

  render() {
    const auth =this.state.auth;
    const columns = [{
      title: '#',
      key:'id',
      render(text, record,index){
        if(record.active==='t'){
          return (<span>{index+1}</span>);
        }else{
          return({
            props: {
              style: { background: '#EAEAEA',opacity:'0.50' },
            },
            children: <span>{index+1}</span>
          });
        }
      },
    },{
      title: 'Marca',
      dataIndex: 'brand',
      width: '20%',
      render(text, record,index){
        if(record.active==='f'){
          return({
            props: {
              style: { background: '#EAEAEA',opacity:'0.50' },
            },
            children: record.brand
          });
        }else{
          return({
            children: record.brand
          });            
        }
      },        
    }, {
      title: 'Model',
      dataIndex: 'model',
      width: '20%',
      render(text, record,index){
        if(record.active==='f'){
          return({
            props: {
              style: { background: '#EAEAEA',opacity:'0.50' },
            },
            children: record.model
          });
        }else{
           return({
            children: record.model
          });             
        }
      },
    }, {
      title: 'Maxima Velocidad',
      dataIndex: 'max_speed',
      render(text, record,index){
        if(record.active==='f'){
          return({
            props: {
              style: { background: '#EAEAEA',opacity:'0.50' },
            },
            children: record.max_speed
          });
        }else{
          return({
            children: record.max_speed
          });            
        }
      },        
    }, {
      title: 'Año de Fabricación',
      dataIndex:'year',
      render(text, record,index){
        if(record.active==='f'){
          return({
            props: {
              style: { background: '#EAEAEA',opacity:'0.50' },
            },
            children: record.year
          });
        }else{
          return({
            children: record.year
          });            
        }
      },        
    }, {
      title: 'Pais de Fabricación',
      dataIndex: 'made_in',
      render(text, record,index){
        if(record.active==='f'){
          return({
            props: {
              style: { background: '#EAEAEA',opacity:'0.50' },
            },
            children: record.made_in
          });
        }else{
          return({
            children: record.made_in
          });            
        }
      },
    }, {
        title: 'Accion',
        render: (text, record,actualizar) => (
          <span>
            <CarroModificarModal datos={record} actualizarTabla = {()=>{this.actualizarT()}} />
            <Divider type="vertical" />
            <CarroEliminar datos={record} actualizarTabla = {()=>{this.actualizarT()}}/>
          </span>
        ),
        width: '10%'  
    }];

    return (
      <div>
        <div>
          <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
        <div className='left'>
          <Link className="App-link" to={{pathname:"/main",auth:auth}} >Volver</Link>
        </div>
        <div className='right'>
          <CarroNuevoModal actualizarTabla = {()=>{this.actualizarT()}} />
        </div>
      </div>
    );
  }
}


export default Manager;
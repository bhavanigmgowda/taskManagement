import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

let columns = [{
  dataField: 'id'
}, {
  dataField: 'name'
}, ];
var products = [{
      id: 1,
      name: "Product1",
      price: 120
  }, {
      id: 2,
      name: "Product2",
      price: 80
  }];

let expandRow = {
  renderer: row => (
    <div>
      {columns.dataField=2}
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  )
};


export class Collapse extends Component {
    render() {
        return (
            <div>
               <BootstrapTable
                    keyField='id'
                    data={ products }
                    columns={ columns }
                    expandRow={ expandRow }
                   
/> 
{products.id}
            </div>
        )
    }
}

export default Collapse


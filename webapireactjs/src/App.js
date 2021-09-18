
import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

function App() {
  const url = "https://localhost:44367/api/productos";
  const [data, setData] = useState([]);
  const [modalInsertar,setModalInsertar] =useState(false);
  const [modalEditar,setModalEditar] =useState(false);  
  const [modalEliminar,setModalEliminar] =useState(false); 
  const [productoSeleccionado, setProductoSeleccionado]=useState({
    id: '',
    nombre:'',
    descripcion:'',
    categoria:'',
    cantidad:'',
    precio:''  
  });

  const handleChange=e=>{
    const {name, value  } = e.target;
    setProductoSeleccionado({
      ...productoSeleccionado,
      [name]: value
    });
  }  

  const abrirCerrarModalInsertar=()=> {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=> {
    setModalEditar(!modalEditar);
  }  
  const abrirCerrarModalEliminar=()=> {
    setModalEliminar(!modalEliminar);
  }

  const getProductos=async()=> {
    await axios.get(url)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const postProductos=async()=> {
    productoSeleccionado.id = parseInt( productoSeleccionado.id);
    productoSeleccionado.cantidad = parseInt( productoSeleccionado.cantidad);
    productoSeleccionado.precio = parseFloat( productoSeleccionado.precio);
    await axios.post(url, productoSeleccionado)
    .then(response=>{
      setData(data.concat(productoSeleccionado));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const putProducto=async()=> {
    productoSeleccionado.id = parseInt( productoSeleccionado.id);
    productoSeleccionado.cantidad = parseInt( productoSeleccionado.cantidad);
    productoSeleccionado.precio = parseFloat( productoSeleccionado.precio);
    await axios.put(url+"/"+ productoSeleccionado.id, productoSeleccionado)
    .then(response=>{
      var dataAuxiliar = data.map(u => u.id !== productoSeleccionado.id ? u : productoSeleccionado);
      setData(dataAuxiliar);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }  

  const deleteProducto=async()=> {
    productoSeleccionado.id = parseInt( productoSeleccionado.id);
    await axios.delete(url+"/"+ productoSeleccionado.id)
    .then(response=>{
      
      setData(data.filter(prod=>prod.id!==productoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }  

  const seleccionarProducto=(producto, caso)=>{
    setProductoSeleccionado(producto);
    (caso==="Editar")?
    abrirCerrarModalEditar():abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    getProductos();
  },[])

  return (
    <div className="App">
      <br /><br/> <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Insertar Nuevo Producto</button>
      <br /><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>DESCRIPCION</th>
            <th>CATEGORIA</th>
            <th>CANTIDAD</th>
            <th>PRECIO</th> 
            <th>ACCIONES</th>         
          </tr>
        </thead>
        <tbody>
        {
          data.map(producto=>(
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.categoria}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.precio}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarProducto(producto,"Editar")}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={()=>seleccionarProducto(producto,"Eliminar")}>Borrar</button>
              </td>
            </tr>


          ))

        }
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
          <ModalHeader>Capturar Datos Nuevo Producto</ModalHeader> 
          <ModalBody>
            <div className="form-group">
              <label>Id: </label>
              <br />
              <input type="text" className="form-control" name="id" onChange={handleChange}/>
              <br />

              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
              <br />  

              <label>Descripcion: </label>
              <br />
              <input type="text" className="form-control" name="descripcion" onChange={handleChange}/>
              <br />                          
              <label>Categoria: </label>
              <br />
              <input type="text" className="form-control" name="categoria" onChange={handleChange}/>
              <br />

              <label>Cantidad: </label>
              <br />
              <input type="text" className="form-control" name="cantidad" onChange={handleChange} />
              <br />  

              <label>Precio: </label>
              <br />
              <input type="text" className="form-control" name="precio" onChange={handleChange}/>
              <br />                          
            </div>
          </ModalBody>
          <ModalFooter>
          <button className="btn btn-primary"  onClick={()=>postProductos()}>Insertar</button>
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>

          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Producto</ModalHeader> 
          <ModalBody>
            <div className="form-group">
              <label>Id: </label>
              <br />
              <input type="text" className="form-control" name="id" readOnly onChange={handleChange} value={productoSeleccionado && productoSeleccionado.id}/>
              <br />

              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.nombre}/>
              <br />  

              <label>Descripcion: </label>
              <br />
              <input type="text" className="form-control" name="descripcion" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.descripcion}/>
              <br />                          
              <label>Categoria: </label>
              <br />
              <input type="text" className="form-control" name="categoria" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.categoria}/>
              <br />

              <label>Cantidad: </label>
              <br />
              <input type="text" className="form-control" name="cantidad" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.cantidad}/>
              <br />  

              <label>Precio: </label>
              <br />
              <input type="text" className="form-control" name="precio" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.precio}/>
              <br />                          
            </div>
          </ModalBody>
          <ModalFooter>
          <button className="btn btn-primary"  onClick={()=>putProducto()}>Editar</button>
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()} >Cancelar</button>

          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          
          <ModalBody>
            ¿Estas seguro de eliminar el producto {productoSeleccionado && productoSeleccionado.nombre}?
            </ModalBody>     
            <ModalFooter>
              <button className="btn btn-danger"  onClick={()=>deleteProducto()}>SI</button>
              <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()} >No</button>
          </ModalFooter>            
        </Modal>   


    </div>
  );
}

export default App;

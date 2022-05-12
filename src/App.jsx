import React from 'react';
import {firebase} from './firebase'
import { useForm } from 'react-hook-form';

function App() {

  const [usuarios, setUsuarios] = React.useState([])
  const [usuario, setUsuario] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  
  const {register, handleSubmit} = useForm()
  const onSubmit = (res) => {
    console.log(res)
  }


  React.useEffect(() => {

    const obtenerDatos = async () => {

      try {

        const db = firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(arrayData)
        setUsuarios(arrayData)
        
      } catch (error) {
        console.log(error)
      }

    }

    obtenerDatos()

  }, [])  


  const agregar = async (e) => {
    e.preventDefault()

    if(!usuario.trim()){
      console.log('está vacio')
      return
    }
    
     
    
    const db = firebase.firestore()
      const nuevoUsuario = {
        Nombre:register,
        Apellido:register,
        name: usuario,
        fecha: Date.now()
      }
      const data = await db.collection('usuarios').add(nuevoUsuario)

      setUsuarios([
        ...usuarios,
        {...nuevoUsuario, id: data.id}
      ])

      setUsuario('')
      
    // } catch (error) {
    //   console.log(error)
    // }

    console.log(usuario)
  }




  
  const eliminar = async (id) => {
    try {
      
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).delete()

      const arrayFiltrado = usuarios.filter(item => item.id !== id)
      setUsuarios(arrayFiltrado)

    } catch (error) {
      console.log(error)
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setUsuario(item.name)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()
    if(!usuario.trim()){
      console.log('vacio')
      return
    }
    try {
      
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).update({
        name: usuario
      })
      const arrayEditado = usuarios.map(item => (
        item.id === id ? {id: item.id, fecha: item.fecha, name: usuario, Nombre: item.Nombre} : item
      ))
      setUsuarios(arrayEditado)
      setModoEdicion(false)
      setUsuario('')
      setId('')
    } catch (error) {
      console.log(error)
    }
  }

 


  

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h3>Lista de Usuarios</h3>
          <ul className="list-group">

          <form onSubmit={handleSubmit (onSubmit)}>
            <label htmlFor='Nombre'>Nombre </label>
            <input id='Nombre'  {...register('Nombre')} />
            <br/>
            <label htmlFor='Apellido'>Apellido</label>
            <input id='Apellido' {...register('Apellido')} />
            <br/>
            <label htmlFor='email'>email</label>
            <input id='email' type='email' {...register('email')} />
            <br/>
            <label htmlFor='fecha'>fecha</label>
            <input id='fecha' type='date' {...register('fecha')} />
            <br/>
            <label htmlFor='password'>password</label>
            <input id='password' type='password' {...register('password')} />
            <br/>
            <input  type='submit' value='enviar' />

          </form>

            {
              usuarios.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.name}
                  <div> {item.Nombre} </div>
                  <div> {item.Apellido} </div>
                  <div> {item.email} </div>

                  <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  <button 
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={() => activarEdicion(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3>
            {
              modoEdicion ? 'Editar Usuario' : 'Agregar Usuario'
            }
          </h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            

            
            
            
            <input 
              type="text"
              placeholder="Ingrese usuario"
              className="form-control mb-2"
              onChange={e => setUsuario(e.target.value)}
              value={usuario} 
              
              
            />

            
            <button 
              className={
                modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
              }
              type="submit"
            >
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

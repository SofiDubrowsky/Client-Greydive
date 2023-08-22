import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar'
import { getResponses } from '../../redux/Actions/getResponses';
import { getForm } from '../../redux/Actions/getForm';
import { getUserById } from '../../redux/Actions/getUserById';
import styles from './Home.module.css'
import image from '../../assets/Greydive.png'
import { deleteRes } from '../../redux/Actions/deleteResponse';
import Swal from 'sweetalert2';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allResponses = useSelector((state) => state.allResponses)
    const userInfo = useSelector((state) => state.user)
    const allForms = useSelector((state) => state.allForms)
    //const access = useSelector((state)=>state.access) //sacar del local storage
    const reload = () => {
        window.location.reload(false);
      };

    const access = localStorage.getItem("access");
    const myId = localStorage.getItem("clientId");
    const userResponses = allResponses.filter(res => Number(res?.UserId) === Number(myId))

    useEffect(() => {
        access !== "true" && navigate("/");
    }, [access]);

    useEffect(() => {
        localStorage.setItem("form", null);
        dispatch(getResponses());
        dispatch(getForm());
        dispatch(getUserById(myId))
    }, [dispatch]);

    const handleSubmit = (event, id) => {
        event.preventDefault();
        localStorage.setItem("response", id);
        navigate(`/update/${id}`);
     };

     const handleDelete = (event, id) => {
        event.preventDefault();
        Swal.fire({
          icon: 'warning',
          title: 'Eliminar Respuesta',
          text: "¿Esta seguro de eliminar esta respuesta?",
          showConfirmButton: true,
          showCancelButton: true, 
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Volver', 
          allowOutsideClick: () => !Swal.isLoading(), 
          preConfirm: async () => {
            try {
              await dispatch(deleteRes(id));
              await dispatch(getResponses());
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 1000).then(
                  setTimeout(() => {
                    Swal.fire({
                      icon: 'success',
                      title: 'Respuesta eliminada con éxito',
                      text: 'La respuesta ha sido eliminada correctamente.',
                      showConfirmButton: false,
                      timer: 2000,
                    })
                  }, 1000)
                  )
              });
            } catch (error) {
              console.error(error);
              return Promise.reject();
            }
          },
        });
        if (result.isConfirmed) {
          Swal.close();
        } else {
          navigate("/home");
        }
      };

    return (
        <div className={styles.home}>
            <div className={styles.data}>
                    <h3 style={{fontSize:"5.5vh", paddingLeft:"3vw",paddingRight:"3vw", marginTop:"7vh" }}>BIENVENIDO A TU CUENTA GREYDIVE</h3>
                <div className={styles.userData}>
                    <h1 style={{fontSize:"2.5vh",textTransform:"uppercase", textDecoration: "underline rgb(131, 34, 196)"  }}>Datos de cuenta</h1>
                    <h4 style={{fontSize:"2vh"}}>Nombre: {userInfo.name}</h4>
                    <h4 style={{fontSize:"2vh" }}>Email: {userInfo.email}</h4>
                    <h4 style={{fontSize:"2vh" }}>Formularios completados: {userResponses?.length}</h4>
                </div>
                <h4 style={{fontSize:"4vh",marginTop:"7vh",marginBottom:"2vh" }}> AGREGAR FORMULARIO </h4>
                <h4 style={{fontSize:"2vh",marginTop:"0vh" }}>Introduce aquí el código del formulario a completar</h4>
                <div className={styles.barContainer}>
                    <SearchBar />
                </div>
                <p style={{ color: "rgb(243, 91, 129)", fontSize: "1.7vh", paddingLeft:"5vw",paddingRight:"5vw" }}>*Recuerda que no podras agregar a tu cuenta un formulario que ya completaste!</p>
            </div>
            <div className={styles.responses}>
                <h2  style={{fontSize:"4vh" }} >MIS FORMULARIOS</h2>
                {(userResponses?.length > 0) ? userResponses?.map((res) => {
                    const form = allForms?.find(form => form.id === res.FormId)
                    
                    return (<div className={styles.res}>
                        <h2  style={{fontSize:"3vh" }}>{form?.title}</h2>
                        <button className={styles.delete} type='submit' onClick={(event) => handleDelete(event,res.id)}>Eliminar</button> 
                        <button className={styles.button} type='submit' onClick={(event) => handleSubmit(event,res.id)}>Ver Respuestas</button>  
                    </div>)
                }
                ) : "No hay formularios por el momento"}
            </div>
        </div>
    )

}
export default Home;
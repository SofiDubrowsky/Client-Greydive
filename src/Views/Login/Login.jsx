import { useState } from "react";
import validate from "./validate";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css"
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/Actions/login'
import { useEffect } from "react";
import image from "../../assets/Greydive.png"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const access = localStorage.getItem("access");

  useEffect(() => {
    access === "true" && navigate("/home");
  }, [access]);

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })

    setErrors(validate({
      ...userData,
      [event.target.name]: event.target.value
    }))
  }

  const [errors, setErrors] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorSave = validate(userData)

    if (Object.keys(errorSave).length === 0) {
      dispatch(login(userData))
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            showConfirmButton: false,
            timer: 2000,
          });

          setUserData({
            email: "",
            password: "",
          });

          navigate("/home");
          localStorage.setItem("access", true);
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response.data.error,
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Por favor, complete correctamente todos los campos.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  }

  return (
    <div className={style.container}>

      <div className={style.column}>
        <img src={image} alt="" />
        <h1 style={{ fontSize: "6vh", color: "rgb(131, 34, 196)" }}>BIENVENIDO A GREYDIVE</h1>
        <p style={{ fontSize: "2vh", marginRight: "11vw", marginLeft: "11vw", fontWeight: "bold" }}>Greydive es una plataforma para completar formularios y almacenar respuestas, para acceder inicia sesión o registrate</p>
      </div>

      <div className={style.col}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>

          <div className={style.text}>
            <div className={style.content}>
              <input onChange={handleChange} value={userData.email} name='email' type='email' placeholder="ingrese su email aqui"></input>
              {!errors.email && <span className={style.noerror}>p</span>}
              {errors.email && <span className={style.error}>{errors.email}</span>}
            </div>

            <div className={style.content}>
              <input onChange={handleChange} value={userData.password} name='password' type='password' placeholder="ingrese su password aqui"></input>
              {!errors.password && <span className={style.noerror}>p</span>}
              {errors.password && <span className={style.error}>{errors.password}</span>}
            </div>
          </div>

          <div>
            <button className={style.btn} disabled={userData.email === '' || userData.password === ''}>Acceder</button>
          </div>

          <div>
            <NavLink to="/SingUp" className={style.account}>
              <p className={style.p2Login}>¿Aún no tienes cuenta?</p>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
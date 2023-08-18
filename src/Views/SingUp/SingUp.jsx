import { useState } from "react";
import validate from "./validation";
import { useNavigate } from "react-router-dom";
import style from "./SingUp.module.css"
import { NavLink } from "react-router-dom";
import { postUser } from "../../redux/Actions/postUser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from 'sweetalert2';
import image from "../../assets/Greydive.png"

const SingUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const access = localStorage.getItem("access");

    useEffect(() => {
        access === "true" && navigate("/home");
    }, [access]);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: ''
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
        event.preventDefault(); //se evita que la página se recargue al enviar el formulario.
        const errorSave = validate(userData); // se asigna el resultado de la funcion validate, pasandole input como parametro.
        // const existName = users.find(user => user.email === userData.email) ? 1 : 0; //si hay alguna actividad con el mismo nombre que el valor ingresado en el campo input.name, existName se establece en 1, de lo contrario, se establece en 0.
        // if (existName === 1)  Swal.fire({
        //     icon: "error",
        //     title: "Error",
        //     text: "Ya hay una cuenta con ese email registrado",
        //     showConfirmButton: false,
        //     timer: 2000
        //   });// si hay una actividad con el mismo nombre 
        if (Object.keys(errorSave).length === 0) {
            dispatch(postUser(userData))
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Cuenta creada exitosamente",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setUserData({
                        email: "",
                        password: "",
                        name: "",
                    });

                    navigate("/");
                })
                .catch((error) => {
                    if (error.response) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error.response.data.error,
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error.message,
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
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
                    <h2>Crear Cuenta</h2>

                    <div className={style.text}>
                        <div className={style.content}>
                            <input onChange={handleChange} value={userData.name} name='name' type='text' placeholder="Nombre"></input>
                            {!errors.name && <span className={style.noerror}>p</span>}
                            {errors.name && <span className={style.error}>{errors.name}</span>}
                        </div>

                        <div className={style.content}>
                            <input onChange={handleChange} value={userData.email} name='email' type='email' placeholder="Correo electrónico"></input>
                            {!errors.email && <span className={style.noerror}>p</span>}
                            {errors.email && <span className={style.error}>{errors.email}</span>}
                        </div>

                        <div className={style.content}>
                            <input onChange={handleChange} value={userData.password} name='password' type='password' placeholder="Contraseña"></input>
                            {!errors.password && <span className={style.noerror}>p</span>}
                            {errors.password && <span className={style.error}>{errors.password}</span>}
                        </div>
                    </div>

                    <div>
                        <button className={style.btn} disabled={userData.email === '' || userData.password === ''}>Crear</button>
                    </div>

                    <div>
                        <NavLink to="/" className={style.account}>
                            <p className={style.p2Login}>¿Ya tienes cuenta? Ingresar</p>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingUp;
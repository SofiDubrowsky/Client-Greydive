import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { getFormById } from '../../redux/Actions/getFormById';
import { postResponses } from '../../redux/Actions/postResponses';
import { getResponseById } from '../../redux/Actions/getResponseById';
import { updateResponse } from '../../redux/Actions/updateResponse';
import Swal from "sweetalert2";
import styles from './Update.module.css'

const Update = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const myId = localStorage.getItem("clientId");
    const { id } = useParams();
    const response = useSelector((state) => state.response)
    console.log(response);
    const selectedForm = useSelector((state) => state.selectedFormId)
    const idForm = response?.FormId
    console.log(idForm);


    const access = localStorage.getItem("response");

    useEffect(() => {
        access !== id && navigate("/");
    }, [access]);


    useEffect(() => {
        dispatch(getResponseById(id));
    }, [dispatch, id]);

    useEffect(() => {
        // Obtener el idForm después de obtener la respuesta
        const idForm = response?.FormId;
        if (idForm) {
            dispatch(getFormById(idForm));
        }

        // Establecer los valores iniciales del formulario
        setFormValues(response.formData || {});
    }, [response, dispatch]);

    console.log(selectedForm);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (fieldName, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
        setFormErrors((prevValues) => validateForm({
            ...prevValues,
            [fieldName]: value,
        }));
        console.log(value);
        console.log(formValues);
    };

    const validateForm = () => {
        const errors = {};
        selectedForm?.structure?.items?.forEach((field) => {
            if (field.required) {
                if (field.type === 'email') {
                    if (!formValues[field.name] || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues[field.name])) {
                        errors[field.name] = 'Ingrese un correo electrónico válido';
                    }
                } else if (field.type === 'text') {
                    const value = formValues[field.name] || '';

                    if (
                        (value.trim() === '') ||  // Es solo espacio o está vacío
                        (value.length < 3) ||     // Tiene menos de 3 caracteres
                        (!value.match(/^[a-zA-Z\s]{1,50}$/))  // No son solo letras y espacios
                    ) {
                        errors[field.name] = 'Ingrese solo letras y espacios, máximo 50 caracteres';
                    }
                }
            }
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const renderFormFields = () => {
        return selectedForm?.structure?.items?.map((field, index) => {
            switch (field.type) {
                case 'text':
                case 'email':
                case 'date':
                    return (
                        <div>
                            <p className={styles.contentt}>{field.label}{field.required && <span style={{ color: 'rgb(243, 91, 129)', marginLeft:'0.2vw'}}> *</span>}</p>

                            <div className={styles.content}>
                                <input
                                    key={index}
                                    type={field.type}
                                    placeholder="Completar"
                                    name={field.name}
                                    value={formValues[field.name] || ''}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                    required={field.required}
                                />
                                {!formErrors[field.name] && <span className={styles.noerror}>p</span>}
                                {formErrors[field.name] && <span className={styles.error}>{formErrors[field.name]}</span>}
                            </div>
                        </div>
                    );
                case 'select':
                    return (
                        <div>
                            <p className={styles.contentt}>{field.label}{field.required && <span style={{ color: 'rgb(243, 91, 129)', marginLeft:'0.2vw'}}> *</span>} </p>

                            <div className={styles.content}>
                                <select
                                    key={index}
                                    value={formValues[field.name] || ''}
                                    name={field.name}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                    required={field.required}
                                >
                                    <option value="" disabled>
                                        Seleccionar
                                    </option>
                                    {field.options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {!formErrors[field.name] && <span className={styles.noerror}>p</span>}
                                {formErrors[field.name] && <span className={styles.error}>{formErrors[field.name]}</span>}
                            </div>
                        </div>
                    );
                case 'checkbox':
                    return (
                        <div>
                            <label key={index} className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    className={styles.checkboxInput}
                                    checked={formValues[field.name] || false}
                                    onChange={(e) =>
                                        handleInputChange(field.name, e.target.checked)
                                    }
                                    required={field.required}
                                />
                                <span className={styles.checkboxLabel}>
                                    {field.label}{field.required && <span style={{ color: 'rgb(243, 91, 129)', marginLeft:'0.2vw'}}>*</span>}
                                </span>
                            </label>

                            {!formErrors[field.name] && <span className={styles.noerror}>p</span>}
                            {formErrors[field.name] && <span className={styles.error}>{formErrors[field.name]}</span>}
                        </div>
                    );
                case 'submit':
                    return (
                        <div>
                            <button className={styles.btn} key={index} type="submit">
                                Editar
                            </button>
                        </div>
                    );
                default:
                    return null;
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validateForm();
        if (result === false) {
            Swal.fire({
                text: 'Debes completar todos los datos obligatorios',
                icon: "warning",
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 3000,
            })
        } else {
            let update = {
                FormId: idForm,
                UserId: myId,
                formData: formValues
            }
            dispatch(updateResponse(id, update))
            Swal.fire({
                text: 'Respuesta Modificada!',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            })
            navigate("/home")
        }
    };

    return (


        <div className={styles.container}>

            <div className={styles.formContainer}>
                <h4>* Indica que la pregunta es obligatoria</h4>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2>{selectedForm.title}</h2>
                    <div className={styles.allInputs}>
                        <div className={styles.text}>
                            {renderFormFields()}
                        </div>

                    </div>
                </form>

            </div>

        </div>


    );
};

export default Update;
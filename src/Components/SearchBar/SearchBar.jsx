import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormById} from "../../redux/Actions/getFormById";
import style from "./SearchBar.module.css"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export default function SearchBar() {
   const navigate = useNavigate()
   const dispatch = useDispatch();
   const [code, setCode] = useState("");
   const allForms = useSelector((state) => state.allForms)
   const allResponses = useSelector((state) => state.allResponses)
   // const selectedCode = useSelector((state) => state.selectedFormId.id)
   const myId = localStorage.getItem("clientId");

   const userSavedForms = allResponses?.filter(res=> res?.UserId === Number(myId))
   
   const match = userSavedForms?.find(res=>res?.FormId=== Number(code) )
  
   const exists = allForms?.find(form=>form?.id === Number(code))
  
   const handleChange = (event) => {
      const value = event.target.value
      setCode(value)
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      const codenum = Number(code)
      dispatch(getFormById(codenum));
      setCode('')
      if(match === undefined && exists ){
         localStorage.setItem("form", codenum);
         navigate(`/form/${codenum}`);
      }
      if(match){
         Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ya has realizado este formulario",
            showConfirmButton: false,
            timer: 2000,
           
        });
      } ;
      if(!exists){
         Swal.fire({
            icon: "error",
            title: "Error",
            text: "Codigo no valido!",
            showConfirmButton: false,
            timer: 2000,
           
        });
      };
   };

   return (
   <div className={style.searchbar}>
      <input className={style.input} placeholder=' Insertar código aqui ' value ={code} onChange={(event) => handleChange(event)}/>
      <button className={style.button} type='submit' onClick={(event) => handleSubmit(event)}>Validar Código</button>  
   </div>
   );
}
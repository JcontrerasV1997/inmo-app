import  { useState } from "react";

// Hook personalizado para formulario 
export const HookForm= (initialState = {}) => {

  const [values, setValues] = useState(initialState);

const reset= () =>{
  setValues(initialState);
}


 
// en el metodo se setea en el hook un spread de values, quiere decir todo lo que pasa por ahi
const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [ values, handleInputChange,reset]; //decido lo que retorna, valor y metodo
};

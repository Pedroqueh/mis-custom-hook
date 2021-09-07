//rafc

import { useState } from "react";

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    //Resetear formulario
    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ({ target }) => {
        //Para establecer el setState y se vea en el input
        setValues({
            //Desestructurar formState por si hay propiedades que no estan cambiando
            ...values,
            //Computar la propiedad para que sea lo que venga en el objeto
            [ target.name ] : target.value
        });
    }

    return [ values, handleInputChange, reset ];
}

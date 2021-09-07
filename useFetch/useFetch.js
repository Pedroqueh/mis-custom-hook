//rafc
//custom hook para hacer peticiones (GET) a cualquier url

import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {

    //Por defecto esta en true (montado), por que el componente se esta renderizando por primera vez (la idea es mantener la referencia cuando el componente este montado)
    const isMounted = useRef(true);

    //useFetch por defecto tendrá un estado
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect( () => {

        //retornará el cambio de isMounted a false, cuando no este montado el componente
        return () => {
            isMounted.current = false;
        }

    },[])

    //una ves recibimos o cambia el url, se activará un efecto
    useEffect( () => {

        //Cada ves que se utiliza, cambia los valores de data, loading y error para mostrar el "Cargando..."
        setState({ data:null, loading: true, error: null });

        fetch( url )
        .then( resp => resp.json() ) //se pasa la resp a json
        .then( data => { //una ves que se tiene la data

            if ( isMounted.current ) {
                setState({
                    loading: false,
                    error: null,
                    data
                });
            }
        })
        .catch( () => {
            setState({
                data: null,
                loading: false,
                error: 'No se pudo cargar la info'
            })
        })

    },[ url ])

    return state;

}

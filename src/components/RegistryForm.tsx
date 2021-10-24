import { Form, Formik, FormikProps } from 'formik';
import * as Yup from "yup"
import SelectInput from './generics/SelectInput';
import StandardInput from './generics/StandardInput';
import BlackLogo from "../assets/images/logo.png"
import { useHistory } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import StateResponse from '../models/state-response';
import useFetch from '../hooks/use-fetch';
import Alert from './generics/Alert';

const RegistryForm: React.FC<{
  className?: string,
}> = (props) => {
  const history = useHistory()
  const {
    error: statesFetchingError,
    isLoading: statesFetchingIsLoading,
    data: states,
    sendRequest: fetchStates
  } = useFetch<StateResponse[]>()
  const {
    error: registryError,
    isLoading: registryRequestIsLoading,
    sendRequest: sendRegistryRequest
  } = useFetch()
  const [selectedUserType, setSelectedUserType] = useState<number>(0)
  const [statesWereAlreadyFetched, setStatesWereAlreadyFetched] = useState<boolean>(false)
  
  const handleChange = (value: string) => {
    setSelectedUserType(parseInt(value))
  }

  useEffect(() => {
    if (!statesWereAlreadyFetched) {
      fetchStates<StateResponse[]>("http://127.0.0.1:8000/states")
      setStatesWereAlreadyFetched(true)
    }
  }, [statesWereAlreadyFetched, fetchStates, states])

  const formRef = useRef<FormikProps<{
    names: string
    lastName: string
    emailAddress: string
    password: string
    stateId: string
    userType: number
    businessName: string
  }>>(null)

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        names: "",
        lastName: "",
        emailAddress: "",
        password: "",
        stateId: "",
        userType: 0,
        businessName: ""
      }}
      validationSchema={Yup.object({
        names: Yup.string()
          .trim()
          .required("Este campo es obligatorio")
          .max(30, "Por favor inserte un nombre de menos de 30 caracteres")
          .matches(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/g, "Por favor inserte un nombre que solo contenga letras, espacios y/o acentos"),
        lastName: Yup.string()
          .trim()
          .required("Este campo es obligatorio")
          .max(30, "Por favor inserte un apellido de menos de 30 caracteres")
          .matches(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/g, "Por favor inserte un apellido que solo contenga letras, espacios y/o acentos"),
        emailAddress: Yup.string()
          .required("Este campo es obligatorio")
          .email("Por favor inserte una dirección de correo válida"),
        password: Yup.string()
          .required("Este campo es obligatorio")
          .min(8, "Por favor inserte una contraseña de al menos 8 caracteres")
          .max(50, "Por favor inserte una contraseña de menos de 50 caracteres")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Por favor introduzca una contraseña con al menos una minúscula, una mayúscula, un símbolo y un número"),
        stateId: Yup.string()
          .required("Este campo es obligatorio")
          .uuid("Por favor seleccione un estado"),
        userType: Yup.number()
          .required("Este campo es obligatorio")
          .oneOf([1, 0], "Por favor seleccione un tipo de usuario"),
        businessName: Yup.string()
          .optional()
          .matches(/[A-z]{1,30}/, "Por favor ingrese solo letras"),
      })}
      onSubmit={(values) => {
        values.userType = +values.userType
        sendRegistryRequest<any>("http://127.0.0.1:8000/users", {
          method: "POST",
          body: JSON.stringify(values)
        }).then(() => {          
          history.push({
            pathname: "/login",
            search: "?success=true",
          })           
        }).catch(() => {
          console.log(registryError)
        })
      }} >
      <>
        <Alert className="absolute w-72 left-1/2 -ml-36 top-8" show={(statesFetchingError && !statesFetchingIsLoading)} title="Error" message="Ocurrió un error" />
        <Alert className="absolute w-72 left-1/2 -ml-36 top-8" show={(registryError && !registryRequestIsLoading)} title="Error" message="Ocurrió un error" />
        <Form className={`w-full lg:w-4/5 xl:w-2/3 rounded-b-lg lg:rounded-lg py-2 px-12 lg:m-auto bg-white ${props.className}`}>
          <img src={BlackLogo} className="mx-auto my-10" alt="" />
          <p className="font-bold text-2xl text-center mb-5">Registro</p>
          <StandardInput
            id="names"
            name="names"
            placeholder="Nombres"
            type="text" />
          <StandardInput
            id="lastName"
            name="lastName"
            placeholder="Apellidos"
            type="text" />
          <StandardInput
            id="emailAddress"
            name="emailAddress"
            placeholder="Correo electrónico"
            type="email" />
          <StandardInput
            id="password"
            name="password"
            placeholder="Contraseña"
            type="password" />
          <SelectInput
            id="stateId"
            name="stateId">
            <option value="" disabled>Estado</option>
            {states ? states.map((state) => {
              return <option value={state.id} key={state.id}> {state.name} </option>
            }) : null}
          </SelectInput>
          <SelectInput
            id="userType"
            name="userType"
            changeHandler={handleChange}>
            <option value="" disabled>Tipo de usuario</option>
            <option value="0">Proveedor de servicio</option>
            <option value="1">Solicitante de servicio</option>
          </SelectInput>
          {selectedUserType === 0 ? (
            <>
              <StandardInput
                id="businessName"
                name="businessName"
                placeholder="Nombre del negocio"
                type="text" />
              <input type="file" accept='image/*' />
            </>
          ) : null}
          <button disabled={statesFetchingIsLoading} type="submit" className="bg-yellow-500 rounded-sm block mx-auto py-1 px-5 text-white text-center my-10">
            Registrarme
          </button>
        </Form>
      </>
    </Formik>
  )
}

export default RegistryForm
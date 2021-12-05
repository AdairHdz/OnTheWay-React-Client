import { Form, Formik, FormikProps } from 'formik';
import * as Yup from "yup"
import SelectInput from './generics/SelectInput';
import StandardInput from './generics/StandardInput';
import BlackLogo from "../assets/images/logo.png"
import { useHistory } from 'react-router';
import { useContext, useEffect, useRef, useState } from 'react';
import StateResponse from '../models/state-response';
import useFetch from '../hooks/use-fetch';
import Alert from './generics/Alert';
import useFlashMessage from '../hooks/use-flash-message';
import RegistryInfo from '../responses/registry-info';
import UserType from '../enums/user-type';
import Login from '../responses/login';
import { AuthContext } from '../store/AuthContext';
import FileInput from './generics/FileInput';
import FileName from '../models/file-name';
import SingleFileInput from './generics/SingleFileInput';

const RegistryForm: React.FC<{
  className?: string,
}> = (props) => {
  const history = useHistory()
  const {
    isLoading: statesFetchingIsLoading,
    data: states,
    sendRequest: fetchStates
  } = useFetch<StateResponse[]>()
  const {
    data: registryResponse,
    error: registryError,
    isLoading: registryRequestIsLoading,
    sendRequest: sendRegistryRequest,
    responseStatus
  } = useFetch<RegistryInfo>()

  const {
    sendRequest: saveBusinessPicture
  } = useFetch()

  const { login } = useContext(AuthContext)

  const [selectedUserType, setSelectedUserType] = useState<number>(UserType.SERVICE_PROVIDER)
  const [statesWereAlreadyFetched, setStatesWereAlreadyFetched] = useState<boolean>(false)
  const [savedUser, setSavedUser] = useState<boolean>(false)
  const { setFlashMessage, message } = useFlashMessage()
  const handleChange = (value: string) => {
    setSelectedUserType(parseInt(value))
  }

  const [filesName, setFilesName] = useState<FileName>()
  const [file, setFile] = useState<File | null>()

  const handleFile = (file: File | null, fileName: FileName) => {
    if (file === null) {
      return
    }

    setFilesName(fileName)
    setFile(file)
  }

  const sendBusinessPicture = () => {    
      setFlashMessage("Registro exitoso", "Por favor, ingrese el código de verificación que hemos enviado a su dirección de correo electrónico")
      const loginInfo = new Login();
      loginInfo.userId = registryResponse.userId
      loginInfo.emailAddress = registryResponse.emailAddress
      loginInfo.token = registryResponse.token
      login(loginInfo)      
    if (!file) {
      history.push("/verify-account")
      return
    }

    const formData = new FormData()
    formData.append("image", file)
    console.log(formData)
    saveBusinessPicture(`http://127.0.0.1:8000/providers/${registryResponse.id}/image`, {
      method: "PUT",
      body: formData
    })
    history.push("/verify-account")
  }

  useEffect(() => {
    if (savedUser) {
      sendBusinessPicture()
    }
  }, [savedUser])

  useEffect(() => {
    if (!statesWereAlreadyFetched) {
      fetchStates<StateResponse[]>("http://127.0.0.1:8000/states")
      setStatesWereAlreadyFetched(true)
    }
  }, [statesWereAlreadyFetched, fetchStates, states])

  useEffect(() => {
    if (responseStatus === 200 && registryResponse) {
      setSavedUser(true)
      return
    }

    if (responseStatus === 452) {
      setFlashMessage("Dirección de correo ya registrada", "La dirección de correo electrónico ya fue usada anteriormente para crear una cuenta")
      return
    }

    if (registryError && !registryRequestIsLoading) {
      setFlashMessage("Error al intentar registrar su cuenta", "Ocurrió un error al intentar registrar su cuenta. Por favor, intente más tarde")      
      return
    }
  }, [history, responseStatus, registryError, registryRequestIsLoading])

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
        userType: UserType.SERVICE_PROVIDER,
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
          .oneOf([1, 2], "Por favor seleccione un tipo de usuario"),
        businessName: Yup.string()
          .optional()
          .matches(/[A-z]{1,30}/, "Por favor ingrese solo letras"),
      })}
      onSubmit={(values) => {
        values.userType = +values.userType
        const bodyRequest = {
          ...values,
          businessPicture: filesName?.name
        }        
        sendRegistryRequest("http://127.0.0.1:8000/users", {
          method: "POST",
          body: JSON.stringify(bodyRequest)
        })
      }} >
      <>
        <Alert className="absolute w-72 left-1/2 -ml-36 top-8" show={message !== undefined} title={message?.title || "Error"} message={message?.message || "Ocurrió un error desconocido"} />
        <Form className={`w-full lg:w-4/5 xl:w-2/3 rounded-b-lg lg:rounded-lg py-2 px-12 lg:m-auto bg-white ${props.className}`}>
          <img src={BlackLogo} className="mx-auto my-10" alt="" />
          <p className="font-bold text-2xl text-center mb-5">Registro</p>
          <StandardInput
            id="names"
            name="names"
            label='Nombre(s)'
            placeholder="Nombres"
            type="text" />
          <StandardInput
            id="lastName"
            name="lastName"
            label='Apellido(s)'
            placeholder="Apellidos"
            type="text" />
          <StandardInput
            id="emailAddress"
            name="emailAddress"
            label='Correo electrónico'
            placeholder="Correo electrónico"
            type="email" />
          <StandardInput
            id="password"
            name="password"
            label='Contraseña'
            placeholder="Contraseña"
            type="password" />
          <SelectInput
            id="stateId"
            name="stateId"
            label='Estado'>
            <option value="" disabled>Estado</option>
            {states ? states.map((state) => {
              return <option value={state.id} key={state.id}> {state.name} </option>
            }) : null}
          </SelectInput>
          <SelectInput
            id="userType"
            name="userType"
            label='Tipo de usuario'
            changeHandler={handleChange}>
            <option value="" disabled>Tipo de usuario</option>
            <option value={UserType.SERVICE_PROVIDER}>Proveedor de servicio</option>
            <option value={UserType.SERVICE_REQUESTER}>Solicitante de servicio</option>
          </SelectInput>
          {selectedUserType === UserType.SERVICE_PROVIDER ? (
            <>
              <StandardInput
                id="businessName"
                name="businessName"
                label='Nombre de negocio'
                placeholder="Nombre del negocio"
                type="text" />
              <SingleFileInput
                id="evidenceFiles"
                name="evidenceFiles"
                label='Imagen de negocio'
                inputHandler={handleFile}
                accept='image/*' />              
            </>
          ) : null}
          <button disabled={statesFetchingIsLoading} type="submit"
            className={`mx-auto mb-5 ${registryRequestIsLoading ? "btn-primary-outlined hover:bg-yellow-500 hover:text-white transition-colors ease-linear" : "btn-primary mx-auto"}`} >
            Registrarme
          </button>
        </Form>
      </>
    </Formik>
  )
}

export default RegistryForm
import { Form, Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import * as Yup from "yup"
import useFetch from "../../hooks/use-fetch"
import useFlashMessage from "../../hooks/use-flash-message"
import FileName from "../../models/file-name"
import ReviewWithRequesterId from "../../responses/review-with-requester-id"
import { AuthContext } from "../../store/AuthContext"
import ErrorMessage from "../generics/ErrorMessage"
import FileInput from "../generics/FileInput"
import StandardInput from "../generics/StandardInput"
import StarScore from "../generics/StarScore"
import TextArea from "../generics/TextArea"

const NewReviewForm: React.FC<{
    serviceProviderId: string
}> = (props) => {

    const {data} = useContext(AuthContext)
    const history = useHistory()

    const [score, setScore] = useState(1)
    const [filesNames, setFilesNames] = useState<FileName[]>([])
    const [files, setFiles] = useState<FileList|null>()
    const {setFlashMessage} = useFlashMessage()

    const handleFiles = (files: FileList|null, filesNames: FileName[]) => {
        if(files === null) {
            return
        }
        
        setFilesNames(filesNames)
        setFiles(files)
    }

    const {
        data: savedReview,
        sendRequest: saveReview,
        isLoading: saveReviewIsLoading,
        error: saveReviewHasError
    } = useFetch<ReviewWithRequesterId>()

    const {
        sendRequest: saveEvidences
    } = useFetch()

    const sendEvidenceFiles = () => {
        setFlashMessage("Reseña registrada", "La reseña ha sido registrada con éxito")
        if(!files) {            
            history.push("/")
            return
        }

        const formData = new FormData()
        for(let i = 0; i < files.length; i++) {
            formData.append("evidence[]", files.item(i)!)
        }
        saveEvidences(`http://127.0.0.1:8000/providers/${props.serviceProviderId}/reviews/${savedReview.id}/evidence`, {
            method: "POST",
            body: formData
        })
        history.push("/")
    }

    useEffect(() => {
        if(savedReview) {
            sendEvidenceFiles()
        }
    }, [savedReview])    

    return (
        <>
            <p className="text-2xl font-bold text-center">Calificación</p>
            <StarScore changeHandler={(currentValue) => setScore(currentValue)} />
            <Formik
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required("Este campo es obligatorio")                        
                        .max(50, "Este campo no puede tener más de 50 caracteres"),
                    details: Yup.string()
                        .required("Este campo es obligatorio")
                        .max(150, "Este campo no puede tener más de 150 caracteres"),                    
                })}
                initialValues={{
                    title: "",
                    details: "",             
                }}
                onSubmit={(values) => {
                    const body = {
                        ...values,
                        evidence: filesNames,
                        serviceRequesterId: data.id,
                        score
                    }
                    saveReview(`http://127.0.0.1:8000/providers/${props.serviceProviderId}/reviews`, {
                        method: "POST",
                        body: JSON.stringify(body)
                    })
                }} >
                <Form>
                    <StandardInput
                        id="title"
                        name="title"
                        type="text"
                        label="Título"
                        placeholder="Título de la reseña" />
                    <TextArea
                        id="details"
                        name="details"
                        label="Detalles"
                        placeholder="Aquí puede detallar su experiencia con el servicio" />
                    <FileInput
                        id="evidenceFiles"
                        name="evidenceFiles"
                        inputHandler={handleFiles} />
                    <button type="submit" className={`mx-auto mb-5 ${saveReviewIsLoading ? 'btn-outlined' : 'btn-primary'}`} disabled={saveReviewIsLoading} >Calificar</button>
                    {saveReviewHasError && <ErrorMessage errorTitle="Error" errorMessage="No se pudo guardar la reseña. Por favor, intente más tarde" />}
                </Form>
            </Formik>
        </>
    )
}

export default NewReviewForm
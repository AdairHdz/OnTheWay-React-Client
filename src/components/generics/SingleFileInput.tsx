import { useField } from "formik"
import FileName from "../../models/file-name"

const SingleFileInput: React.FC<{
    id: string,
    name: string,
    label?: string,
    accept: string,
    inputHandler?: (files: File|null, fileName: FileName) => void
}> = (props) => {    

    const [fieldProps, metadata] = useField({name: props.name})

    return (
        <div className="mb-5">
            {props.label && (
                <>
                    <label className="block text-left" htmlFor={props.name}>
                        {props.label}
                    </label>
                    <br />
                </>                
            )}            
            <input                
                {...fieldProps}
                id={props.id}
                name={props.name}
                accept={props.accept}
                onChange={(e) => {
                    const value = e.currentTarget.files                    
                    if(value === null) {
                        return                        
                    }
                    let selectedFile: FileName
                    selectedFile = {
                        name: value.item(0)!.name
                    }
                    if(props.inputHandler) {
                        props.inputHandler(value.item(0), selectedFile)
                    }
                }}                
                type="file" />
            {(metadata.error && metadata.touched) ? (
                <p className="input-error-text">
                    {metadata.error}
                </p>
            ) : null }
        </div>
    )
}

export default SingleFileInput
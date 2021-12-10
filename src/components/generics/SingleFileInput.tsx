import { useField } from "formik"

const SingleFileInput: React.FC<{
    id: string,
    name: string,
    label?: string,
    accept: string,    
    inputHandler: (files: File|null) => void,    
}> = (props) => {    

    const [fieldProps, metadata, helpers] = useField({name: props.name})

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
                type="file"                
                onChange={(e) => {
                    props.inputHandler(e.currentTarget.files!.item(0))
                    helpers.setValue(e.currentTarget.value)                    
                }} />
            {(metadata.error && metadata.touched) ? (
                <p className="input-error-text">
                    {metadata.error}
                </p>
            ) : null }
        </div>
    )
}

export default SingleFileInput
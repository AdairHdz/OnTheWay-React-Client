import { useField } from "formik"
import FileName from "../../models/file-name"

const FileInput: React.FC<{
    id: string,
    name: string,
    label?: string,
    accept?: string,
    multiple?: boolean
    inputHandler?: (files: FileList|null, filesNames: FileName[]) => void
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
                accept={`${props.accept ? props.accept : '.png, .jpeg, .jpg,.mp4'}`}
                multiple={props.multiple ? props.multiple : true}
                onChange={(e) => {
                    const value = e.currentTarget.files
                    let filesArray: FileName[] = []
                    if(value !== null) {                        
                        for(let i = 0; i < value.length; i++) {
                            let file = {
                                name: value.item(i)!.name
                            }
                            filesArray.push(file)
                        }                        
                    }
                    if(props.inputHandler) {
                        props.inputHandler(value, filesArray)
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

export default FileInput
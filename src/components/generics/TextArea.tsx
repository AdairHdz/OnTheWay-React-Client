import { useField } from "formik"

const TextArea: React.FC<{
    id: string,
    name: string,    
    placeholder?: string,
    label?: string,
    className?: string,
    inputHandler?: (value: string) => void
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
            <textarea
                className={`
                    w-full border-0 border-b-2 
                    border-gray-300 focus:outline-none resize-none`}
                {...fieldProps}
                id={props.id}                
                name={props.name}
                placeholder={props.placeholder}
                onChange={(e) => {
                    const value = e.target.value                    
                    helpers.setValue(value)
                    if(props.inputHandler) {
                        props.inputHandler(value)
                    }
                }}>
            </textarea>
            {(metadata.error && metadata.touched) ? (
                <p className="input-error-text">
                    {metadata.error}
                </p>
            ) : null }
        </div>
    )
}

export default TextArea
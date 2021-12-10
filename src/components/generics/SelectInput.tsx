import { useField } from "formik"

const SelectInput: React.FC<{
    id: string,
    name: string,        
    label?: string,
    changeHandler?: (value: string) => void
}> = (props) => {

    const [fieldProps, metadata, helpers] = useField({name: props.name})

    return (
        <div className="mb-5 text-left">
            {props.label && (
                <>
                    <label htmlFor={props.id || props.name} className="mb-2 inline-block">
                        {props.label}
                    </label>
                    <br />
                </>
            )}
            <select
                className={`
                    w-full border-0 border-b-2
                    border-gray-300 bg-white focus:outline-none`}
                {...fieldProps}
                {...props}                
                onChange={(value) => {
                    helpers.setValue(value.target.value)
                    if(props.changeHandler) {
                        props.changeHandler(value.target.value)
                    }
                }} />
            {metadata.error && metadata.touched ? (
                <p className="input-error-text">
                    {metadata.error}
                </p>
            ) : null}
        </div>
    )
}

export default SelectInput
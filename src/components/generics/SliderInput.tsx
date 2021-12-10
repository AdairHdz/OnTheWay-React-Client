import { useField } from "formik"

const SliderInput: React.FC<{
    id: string,
    name: string,        
    label?: string,
    className?: string,
    min: number,
    max: number,
    changeHandler: (value: string) => void
}> = (props) => {

    const [fieldProps, metadata, helpers] = useField({name: props.name})

    return (
        <div className="mb-5">
            {props.label && (
                <>
                    <label htmlFor={props.name}>
                        {props.label}
                    </label>
                    <br />
                </>                
            )}            
            <input
                className="w-full border-0 border-b-2 border-gray-300 focus:outline-none"
                {...fieldProps}
                onChange={
                    (e) => { 
                        helpers.setValue(e.target.value)
                        props.changeHandler(e.target.value)
                    }                    
                }
                id={props.id}
                type="range"
                name={props.name}
                min={props.min}
                max={props.max} />
            {(metadata.error && metadata.touched) ? (
                <p className="input-error-text">
                    {metadata.error}
                </p>
            ) : null }
        </div>
    )
}

export default SliderInput
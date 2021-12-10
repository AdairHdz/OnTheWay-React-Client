import { useField } from "formik"

const TimeInput: React.FC<{
    id: string,
    name: string,
    label: string,
    className?: string
}> = (props) => {
    const [fieldProps, metadata] = useField({name: props.name, id: props.id})
    return (
        <div>         
            <label className="block text-center font-bold" htmlFor={props.id}>
                {props.label}
            </label>
            <input
                type="time"
                className={`rounded-sm border-gray-300 bg-gray-200 ${props.className}`}
                {...fieldProps}/>
            {(metadata.error && metadata.touched) ? (
                <p className="input-error-text">
                    {metadata.error}
                </p>
            ) : null }
        </div>
    )
}

export default TimeInput
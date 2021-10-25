import { useField } from "formik"

const TimeInput: React.FC<{
    id: string,
    name: string,
    label: string,
    className?: string
}> = (props) => {
    const [fieldProps] = useField({name: props.name, id: props.id})
    return (
        <>         
            <label className="block text-center font-bold" htmlFor={props.id}> {props.label} </label>
            <input
                type="time"
                className={`rounded-sm border-gray-300 bg-gray-200 ${props.className}`}
                {...fieldProps}/>
        </>
    )
}

export default TimeInput
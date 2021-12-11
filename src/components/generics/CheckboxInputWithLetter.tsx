import { useField } from "formik"

const CheckboxInputWithLetter: React.FC<{
    id: string,
    name: string,
    letter: string,
    value: number
}> = (props) => {

    const [fieldProps] = useField({ name: props.name })
    const textColor = fieldProps.checked ? "text-white" : "text-blue-600"
    return (
        <div className={`h-7 w-7 group relative`}>
            <input
                type="checkbox"
                id={props.id}
                {...fieldProps}
                className={`
                    bg-white text-blue-600 rounded-full w-full h-full
                    checked:bg-blue-600 group-hover:bg-blue-600 absolute`}
                value={props.value}
            />
            <label
                htmlFor={props.id}
                className={`absolute h-full w-full text-center ${textColor}`}>
                {props.letter}
            </label>
        </div>
    )
}

export default CheckboxInputWithLetter
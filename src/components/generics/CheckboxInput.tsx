import { Field, useField } from "formik"

const CheckboxInput: React.FC<{
    label: string,
    className?: string
    id: string,    
    name: string
}> = (props) => {

    const [fieldProps, metadata] = useField({ name: props.name })

    return (
        <div className={`${props.className}`}>
            <div className="px-3">
                {/* <label className="inline ">
                    <input
                        type="checkbox"
                        className="rounded-sm bg-gray-200 border-gray-300 mr-3"
                        id={props.id}
                        {...fieldProps} />
                    {props.label}
                </label>                 */}
                <label>
                    <Field type="checkbox" {...fieldProps} name={props.name} />
                    {props.label}
                </label>
            </div>
            {metadata.error && metadata.touched && (
                    <p className="text-left font-thin text-red-500"> {metadata.error} </p>
                )}
        </div>
    )
}

export default CheckboxInput
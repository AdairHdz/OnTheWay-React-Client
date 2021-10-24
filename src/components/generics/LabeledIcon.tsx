import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-common-types"

const LabeledIcon: React.FC<{
    className?: string,
    component: IconDefinition,
    text: string
}> = (props) => {
    return (
        <div className={`flex flex-col items-center h-full justify-center p-2 md:p-2 ${props.className}`}>
            <FontAwesomeIcon
                icon={props.component}
                className="text-white" />
            <p className="text-sm font-thin text-center w-auto text-white md:hidden">
                {props.text}
            </p>
        </div>
    )
}

export default LabeledIcon
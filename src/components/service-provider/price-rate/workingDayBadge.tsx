import WorkingDay from "../../../enums/working-day";

const WorkingDayBadge: React.FC<{
    workingDay: WorkingDay    
}> = (props) => {
    let letterToBePrinted

    switch(props.workingDay) {
        case WorkingDay.MONDAY:
            letterToBePrinted = "L"
            break;
        case WorkingDay.TUESDAY:
            letterToBePrinted = "M"
            break;
        case WorkingDay.WEDNESDAY:
            letterToBePrinted = "M"
            break;
        case WorkingDay.THURSDAY:
            letterToBePrinted = "J"
            break;
        case WorkingDay.FRIDAY:
            letterToBePrinted = "V"
            break;
        case WorkingDay.SATURDAY:
            letterToBePrinted = "S"
            break
        case WorkingDay.SUNDAY:
            letterToBePrinted = "D"
            break
        default:
            letterToBePrinted = "?"
    }

    return (
        <div className={`
            rounded-full p-2 bg-blue-600
            text-white text-center w-8 h-8
            flex items-center justify-center`
        }>
            <p> {letterToBePrinted} </p>
        </div>
    )
}

export default WorkingDayBadge
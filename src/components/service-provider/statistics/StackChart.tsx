import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import RequestedServicesPerWeekday from '../../../models/requested-services-per-weekday';
import weekdayMapper from '../../../utils/weekday-mapper';

const StackChart: React.FC<{
    className?: string,
    title: string,
    requestedServicesPerWeekday: RequestedServicesPerWeekday[]
}> = (props) => {

    const [weekdays, setWeekdays] = useState<string[]>([])
    const [serviceRequests, setServiceRequests] = useState<number[]>([])

    useEffect(() => {
        let weekdaysArray = props.requestedServicesPerWeekday.map(({weekday}) => {
            return weekdayMapper(weekday)            
        })

        console.log(weekdaysArray)
        setWeekdays(weekdaysArray)
    }, [props.requestedServicesPerWeekday])

    useEffect(() => {
        let serviceRequestsQuantity: number[] = []
        serviceRequestsQuantity = props.requestedServicesPerWeekday.map(({requestedServices}) => {
            return serviceRequestsQuantity.push(requestedServices)
        })
        setServiceRequests(serviceRequestsQuantity)
    }, [props.requestedServicesPerWeekday])

    const data = {
        labels: weekdays,
        datasets: [
            {   
                label:"",
                data: serviceRequests,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className={props.className}>
            <p className="text-center text-2xl"> {props.title} </p>
            <Bar data={data} />
        </div>
    )
};

export default StackChart;
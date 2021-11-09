import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import RequestedServicesPerKindOfService from '../../../models/requested-services-per-kind-of-service';
import getKindOfService from "../../../utils/kind-of-service-mapper"

const PieChart: React.FC<{
  className?: string,
  title: string,
  requestedServicesPerKindOfService: RequestedServicesPerKindOfService[]
}> = (props) => {

  const [kindsOfServices, setKindsOfServices] = useState<string[]>()
  const [requestedServicesQuantity, setRequestedServicesQuantity] = useState<number[]>()

  useEffect(() => {
    let kindOfServiceNames: string[] = []
      kindOfServiceNames = props.requestedServicesPerKindOfService.map(({kindOfService}) => {
        return getKindOfService(kindOfService)
      })
      setKindsOfServices(kindOfServiceNames)
  }, [props.requestedServicesPerKindOfService])

  useEffect(() => {
    let requestedServ: number[] = []
    requestedServ = props.requestedServicesPerKindOfService.map(({requestedServices}) => {
      return requestedServices
    })

    setRequestedServicesQuantity(requestedServ)
}, [props.requestedServicesPerKindOfService])

  const data = {
    labels: kindsOfServices,
    datasets: [
      {
        data: requestedServicesQuantity,
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
      <p className="text-center text-2xl mb-5"> {props.title} </p>
      <Pie data={data} />
    </div>
  )
};

export default PieChart;
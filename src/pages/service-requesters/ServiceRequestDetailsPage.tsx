const ServiceRequestDetailsPage = () => {
    return (
        <div className="shadow-md bg-white m-5 p-5 lg:w-2/3 lg:mx-auto">
            <p className="font-bold text-lg mb-5">Datos del servicio</p>
            <div className="text-justify mb-5">
                <p className="font-bold">Tipo de servicio</p>
                <p>Pago de servicios</p>
                <p className="font-bold">Región</p>
                <p>Xalapa</p>
                <p className="font-bold">Detalles adicionales</p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam doloremque et dolores quo non magnam velit deleniti.
                    Eos aspernatur laborum totam at ad mollitia, voluptatibus quaerat
                    consequatur dolore deleniti minus.
                </p>
                <p className="font-bold">Costo</p>
                <p>$50.00 MXN</p>
                <p className="font-bold">Fecha</p>
                <p>02/03/2020 2:25 PM</p>
                <p className="font-bold">Estado</p>
                <p>Activo</p>
            </div>
            <div className="flex justify-around">
                <button className="btn-primary">Marcar como completado</button>
                <button className="btn-primary">Calificar servicio</button>
                <button className="btn-primary-outlined hover:bg-yellow-500 hover:text-white transition-colors ease-linear">Cancelar</button>
            </div>
        </div>
    )
}

export default ServiceRequestDetailsPage
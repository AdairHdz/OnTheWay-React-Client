import ReactDOM from "react-dom"

const Modal: React.FC<{}> = (props) => {
    const portalRoot = document.getElementById("portal")!
    return ReactDOM.createPortal((
        <div className={`rounded-lg p-8 shadow-lg z-10 absolute top-0 xl:top-32 xl:left-1/3 left-0 md:left-1/3 w-full h-full md:h-screen overflow-y-auto md:w-1/2 lg:h-1/2 lg:top-1/3 xl:h-3/4 xl:w-1/3 bg-white`}>
            {props.children}
        </div>
    ), portalRoot)
}

export default Modal
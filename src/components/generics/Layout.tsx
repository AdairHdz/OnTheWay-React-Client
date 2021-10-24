import Navbar from "./Navbar"

const Layout: React.FC<{}> = (props) => {
    return (
        <div className="bg-gray-200 w-screen h-screen justify-between flex flex-col md:flex-row">
            <Navbar />
            {props.children}            
        </div>
    )
}

export default Layout
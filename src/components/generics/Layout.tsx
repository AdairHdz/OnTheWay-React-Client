import Navbar from "./Navbar"

const Layout: React.FC<{}> = (props) => {
    return (
        <main className="bg-gray-200 w-screen h-screen justify-between flex flex-col md:flex-row">
            <Navbar />
            {props.children}            
        </main>
    )
}

export default Layout
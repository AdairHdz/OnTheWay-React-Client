import Layout from "./Layout"

const MainTabLayout: React.FC<{}> = (props) => {
    return (
        <Layout>
            <div className="w-full md:w-11/12 md:mx-auto overflow-y-auto">
                {props.children}
            </div>
        </Layout>
    )
}

export default MainTabLayout
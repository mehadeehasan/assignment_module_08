import Layout from "../layout/Layout";

function NoPage() {
  return (
    <Layout>
        <div className="sm:h-screen bg-center">
        <div className="container mx-auto my-16 pt-10">
            <h1 className="text-9xl">404: No Page Found.</h1>
            </div>    
        </div>
    </Layout>
  )
}
export default NoPage

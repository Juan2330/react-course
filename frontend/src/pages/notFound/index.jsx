import Layout from '../../components/layout';

function NotFound() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Not Found</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">The page you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            </div>
        </Layout>
    );
}

export default NotFound;
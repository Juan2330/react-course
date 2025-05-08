import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout';
import { ShoppingCartContext } from '../../context';

function MyAccount() {
    const context = useContext(ShoppingCartContext);

    return (
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-8 px-10">
                <h1 className="text-3xl font-bold text-white text-center">My Account</h1>
              </div>
                    
              {context.user ? (
                <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1 flex flex-col items-center space-y-6">
                    <div className="relative">
                      <img 
                        src={context.user.photos?.[0]?.value || 'https://via.placeholder.com/150'} 
                          alt="Profile" 
                          className="w-40 h-40 rounded-full border-4 border-white shadow-xl"
                      />
                      <div className="absolute bottom-2 right-2 bg-green-500 rounded-full w-8 h-8 border-2 border-white flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                                
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {context.user.displayName || context.user.username || 'User'}
                      </h2>
                      <p className="text-indigo-600 dark:text-indigo-400 mt-1">Member since GitHub</p>
                    </div>
                                
                    <button
                      onClick={context.logout}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                        Logout
                    </button>
                  </div>

                  <div className="md:col-span-2 space-y-8">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl transition-colors">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-4">
                        Account Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
                          <p className="text-lg text-gray-900 dark:text-white font-semibold mt-1">{context.user.username || 'Not available'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-lg text-gray-900 dark:text-white font-semibold mt-1">
                            {context.user.emails?.[0]?.value || 'Not available'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">GitHub ID</p>
                          <p className="text-lg text-gray-900 dark:text-white font-semibold mt-1">{context.user.id || 'Not available'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</p>
                          <p className="text-lg text-gray-900 dark:text-white font-semibold mt-1">GitHub</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl hover:shadow-md transition-shadow">
                        <div className="p-4 border-b border-indigo-100 dark:border-indigo-800">
                          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 text-center">
                            Total Orders
                          </p>
                        </div>
                        <div className="p-6 flex justify-center items-center h-[80px]">
                          <p className="text-3xl font-bold text-indigo-900 dark:text-indigo-200">
                            {context.order?.length || 0}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:shadow-md transition-shadow">
                        <div className="p-4 border-b border-purple-100 dark:border-purple-800">
                          <p className="text-sm font-medium text-purple-600 dark:text-purple-400 text-center">
                            Total Spent
                          </p>
                        </div>
                        <div className="p-6 flex justify-center items-center h-[80px]">
                          <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                            ${context.order?.reduce((total, order) => 
                              total + Number(order.totalPrice || 0), 0).toFixed(2) || '0.00'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl hover:shadow-md transition-shadow">
                        <div className="p-4 border-b border-green-100 dark:border-green-800">
                          <p className="text-sm font-medium text-green-600 dark:text-green-400 text-center">
                            Last Order
                          </p>
                        </div>
                        <div className="p-6 flex flex-col justify-center items-center h-[80px]">
                          {context.order?.[0]?.date ? (
                            <>
                              <span className="text-lg font-bold text-green-900 dark:text-green-200">
                                {new Date(context.order[0].date).toLocaleDateString('en-US', {
                                  month: '2-digit',
                                  day: '2-digit',
                                  year: 'numeric'
                                })}
                              </span>
                              <span className="text-sm text-green-700 dark:text-green-300">
                                {new Date(context.order[0].date).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-green-900 dark:text-green-200">N/A</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 dark:text-white">You are not logged in</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                    Please log in with your GitHub account to access all profile features.
                  </p>
                  <div className="mt-8">
                    <Link
                      to="/login"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors duration-200"
                    >
                      Go to Login Page
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Layout>
    );
}

export default MyAccount;
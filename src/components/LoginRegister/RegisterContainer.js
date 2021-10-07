import React from 'react'

function RegisterContainer({ children, onSubmit }) {
    return (
        <div className="flex h-screen">
            <div className="container my-auto mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg">
                        <div className="w-full h-auto hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{ backgroundImage: `url(/tongsampah.png)` }}></div>
                        <div className="w-full lg:w-7/12 p-5 rounded-lg lg:rounded-l-none bg-gray-50">
                            <h3 className="pt-4 text-2xl text-center">Register New Account</h3>
                            <form onSubmit={onSubmit} className="px-8 pt-6 pb-8 mb-4 bg-gray-50 rounded">
                                {children}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterContainer

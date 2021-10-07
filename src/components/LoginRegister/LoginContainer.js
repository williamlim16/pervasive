import React from 'react'

function LoginContainer({ children, onSubmit }) {
    return (
        <>
            <div class="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
                <div class="absolute bg-gray-200 opacity-60 inset-0 z-0"></div>
                <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
                    <div class="text-center">
                        <h2 class="mt-6 text-3xl font-bold text-gray-900">
                            Welcome Back!
                        </h2>
                        <p class="mt-2 text-sm text-gray-600">Please sign in to your account</p>
                    </div>

                    <div class="flex items-center justify-center space-x-2">
                        <span class="h-px w-32 bg-gray-300"></span>
                    </div>
                    <form class="mt-8" onSubmit={onSubmit}>
                        {children}
                    </form>
                    <p class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                        <span>Don't have an account?</span>
                        <a href="#" class="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign up</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginContainer

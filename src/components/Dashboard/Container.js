import React from 'react'

export default function Container({ children }) {
    return (
        <div className="container relative sm:mx-auto mb-20 px-5 2xl:px-20 flex-1 h-full overflow-x-hidden overflow-y-auto">
            <main>
                <div className="mt-4">
                    {children}
                </div >
            </main >

        </div >
    )
}

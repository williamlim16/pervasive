import React from 'react'


export default function Chart({ chart_id, charTitle, len }) {
    return (
        <div className="lg:mx-5">
            <div className="bg-white rounded-xl shadow-lg divide-y w-full">
                <div className="flex items-center justify-between p-4 dark:border-primary">
                    <h4 className="text-lg font-semibold text-gray-500">{charTitle}</h4>
                </div>
                <div className=" h-full grid overflow-auto" style={{ gridTemplateColumns: 1 + 'fr' }}>

                    <div className="w-auto h-80  duration-300">
                        <div className="h-full">
                            {len === 0 ?
                                <div className="flex justify-center items-center h-full space-x-2 ">
                                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1"></div>
                                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-2"></div>
                                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-3"></div>
                                </div>
                                :
                                <div id={chart_id} className='h-full w-full relative mr-auto ml-auto z-0'> </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

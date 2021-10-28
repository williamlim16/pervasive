import React from 'react'


export default function Chart({ chart_id, charTitle }) {
    return (
        <div className="lg:mx-5">
            <div className="bg-white rounded-xl shadow-lg divide-y w-full">
                <div className="flex items-center justify-between p-4 dark:border-primary">
                    <h4 className="text-lg font-semibold text-gray-500">{charTitle}</h4>
                </div>
                <div className=" h-full grid overflow-auto" style={{ gridTemplateColumns: 1 + 'fr' }}>

                    <div className="w-auto h-80  duration-300">
                        <div id={chart_id} className="h-full w-full relative mr-auto ml-auto z-0"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

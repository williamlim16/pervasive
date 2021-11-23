import React, { useState } from 'react'

export default function SearchBar({ searchBarData, onClick }) {
    const [clickedButton, setClickedButton] = useState(false)

    return (
        <div className="grid grid-cols-1 p-4 space-y-8 lg:gap-6 lg:space-y-0">
            <div className="mr-0 ml-auto">
                <div className="max-w-sm overflow-hidden">
                    <h3 className="p-4 text-right pr-14">Select Trash Can </h3>
                    <div className="mr-8 ml-4">
                        <div className="relative">
                            <button onClick={(() => setClickedButton(!clickedButton))} className="bg-teal p-3 rounded text-black shadow-inner w-full">
                                <span className="float-left">Show options</span>

                                <svg className="ml-4 mt-1.5 h-4 float-right fill-current text-black" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enable-background="new 0 0 129 129">
                                    <g>
                                        <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                                    </g>
                                </svg>
                            </button>
                            <div className={`${clickedButton ? "opacity-100" : "opacity-0"} bg-gray-100 rounded shadow-md my-2 z-20 fixed`}>
                                <ul>
                                    <li className="p-2"><input className="border-2 rounded h-8 w-full" /><br /></li>
                                    <li>
                                        <p className="p-2 block text-black hover:bg-grey-light cursor-pointer" onClick={((e) => onClick("all", "All Trash Sorters"))}>
                                            All
                                        </p>
                                    </li>
                                    {searchBarData ? searchBarData.map((data, index) => (
                                        <li>
                                            <p className="p-2 block text-black hover:bg-grey-light cursor-pointer" onClick={(() => onClick(data.Id, "trash sorter at " + data.Location))}>
                                                {data.Location}
                                            </p>
                                        </li>
                                    )) : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

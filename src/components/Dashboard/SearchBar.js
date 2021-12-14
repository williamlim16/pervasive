import React, { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ViewGridAddIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchBar({ searchBarData, onClick, onChange, searchInput, onClickAdd }) {
    const [clickedButton, setClickedButton] = useState(false)

    return (
        <>
            <div className="grid grid-cols-2 p-4 lg:gap-6 lg:space-y-0">
                <div className="flex justify-start">
                    <div className="max-w-sm overflow-hidden">
                        <h3 className="p-4 text-left pr-14">Add new Trash Can</h3>
                        <div className="mr-8 ml-4">
                            <div>
                                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                                    onClick={onClickAdd}>
                                    Add
                                    <ViewGridAddIcon className=" ml-2 h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="max-w-sm overflow-hidden">
                        <h3 className="p-4 text-left pr-14">Select Trash Can </h3>
                        <Menu as="div" className="mr-8 ml-4">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
                                    Options
                                    <ChevronDownIcon className=" ml-2 h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-10"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute 2xl:right-32 right-16 z-20  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                    <div className="py-1 items-center p-2">
                                        <input type="text" onChange={onChange} className='border-2 px-2 focus:outline-none ring-1 ring-gray-200 focus:ring-1 focus:border-transparent focus:ring-blue-300 border-transparent rounded-md'></input>
                                    </div>
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <p
                                                    onClick={((e) => onClick("all", "All Trash Sorters"))}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    All
                                                </p>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    {searchBarData ?
                                        <div className="py-1">
                                            {searchBarData ? searchBarData.filter((data) => data.location.toLowerCase().includes(searchInput.toLowerCase())).map((data, index) => (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <div
                                                            onClick={(() => onClick(data.id, "trash sorter at " + data.location))}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            <p>{data.location}</p>
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            )) : ''}
                                        </div>
                                        : ''
                                    }
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    )
}

import React, { Fragment } from "react";
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const DropDown = (props) => {
    const application = props.application

    let urls = []
    if (application.urls === {}) {
        return
    }
    Object.keys(application.urls).forEach(key => {
        if (key === "github") {
            urls.push({ "display": "View on Github", "url": application.urls.github[0] })
        } else if (key === "gitpod") {
            urls.push({ "display": "Open in IDE", "url": application.urls["gitpod"] })
        } else if (key === "youtube") {
            urls.push({ "display": "Watch the Video", "url": application.urls["youtube"][0] })
        } else if (key === "demo") {
            urls.push({ "display": "View the Demo", "url": application.urls["demo"] })
        }
    })

    return (
        <div className="col-auto">
        <Menu as="div" className="relative inline-block text-left leading-8">
            
                <Menu.Button className="inline-flex w-full bg-indigo-500 text-white active:bg-indigo-200 
      font-bold px-6 pt-.5 mt-16 rounded shadow hover:shadow-lg outline-none focus:outline-none leading-8">
      
                    Try it Out
                
                    <ChevronDownIcon className="-mr-2 h-8 w-5 " aria-hidden="true" />
                    
                </Menu.Button>

            <Menu.Items as="section" className="absolute right-0 z-10 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="flex-col flex" key={application.name}>
                    {urls && urls.map((url) => (
                        <Menu.Item key={url.url} as={Fragment} className="py-1 px-1 box-border border-2">
                            {({ active }) => (
                                <a 
                                    href={url.url} target="_blank" rel="noreferrer"
                                    className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                >
                                    {url.display}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </div>
            </Menu.Items>
        </Menu >
        </div>
    );
}

export default DropDown
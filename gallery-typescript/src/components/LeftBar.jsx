import * as React from "react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
const LeftBar = (props) => {
  const searchString = props.searchString;
  const setSearchString = props.setSearchString;
  const section = props.section;
  props.tagset &&
    props.tagset.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
  // group the tags by type, to create the groupings in the left pane.

  const filter = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <div id="Leftbar" className="col-2 ml-2">
        {props.section && (
          <div className="flex flex-column justify-center">
            <div className="flex justify-center">
              <div className="mb-1 xl:w-96">
                <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                  <input
                    type="search"
                    id="default-input"
                    value={searchString}
                    onChange={filter}
                    width="200px"
                    className="input form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="reset-button"
              onClick={() => {
                props.resetFilters();
              }}
            >
              {" "}
              <h3>
                <b>Reset Filters</b>
              </h3>
            </button>

            <hr />
            <h4>
              Languages{" "}
              <button
                type="button"
                onClick={() => {
                  props.setLang(!props.showLang);
                }}
              >
                {" "}
                <ChevronDownIcon className=" h-5 w-3 " />
              </button>
            </h4>
            {props.showLang && (
              <span id="languages">
                {section["languages"].map((tag, index) => (
                  <button
                    key={index}
                    className={
                      props.filteredTag(tag)
                        ? "inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        : "inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }
                    onClick={(e) => props.onClick(tag, e)}
                  >
                    {tag}
                  </button>
                ))}
              </span>
            )}
            <h4>
              Technology{" "}
              <button
                type="button"
                onClick={() => {
                  props.setTech(!props.showTech);
                }}
              >
                {" "}
                <ChevronDownIcon className=" h-5 w-3 " />
              </button>
            </h4>
            {props.showTech && (
              <span id="technology">
                {section["technology"].map((tag, index) => (
                  <button
                    key={index}
                    className={
                      props.filteredTag(tag)
                        ? "inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        : "inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }
                    onClick={(e) => props.onClick(tag, e)}
                  >
                    {tag}
                  </button>
                ))}
              </span>
            )}
            <h4>
              Integrations{" "}
              <button
                type="button"
                onClick={() => {
                  props.setInt(!props.showInt);
                }}
              >
                {" "}
                <ChevronDownIcon className=" h-5 w-3 " />
              </button>
            </h4>
            {props.showInt && (
              <span id="integrations">
                {section["integrations"].map((tag, index) => (
                  <button
                    key={index}
                    className={
                      props.filteredTag(tag)
                        ? "inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        : "inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }
                    onClick={(e) => props.onClick(tag, e)}
                  >
                    {tag}
                  </button>
                ))}
              </span>
            )}
            <h4>
              APIs{" "}
              <button
                type="button"
                onClick={() => {
                  props.setAPI(!props.showAPI);
                }}
              >
                {" "}
                <ChevronDownIcon className=" h-5 w-3 " />
              </button>
            </h4>
            {props.showAPI && (
              <span id="apis">
                {section["apis"].map((tag, index) => (
                  <button
                    key={index}
                    className={
                      props.filteredTag(tag)
                        ? "inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        : "inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }
                    onClick={(e) => props.onClick(tag, e)}
                  >
                    {tag}
                  </button>
                ))}
              </span>
            )}
            <h4>
              Frameworks{" "}
              <button
                type="button"
                onClick={() => {
                  props.setFrame(!props.showFrame);
                }}
              >
                {" "}
                <ChevronDownIcon className=" h-5 w-3 " />
              </button>
            </h4>
            {props.showFrame && (
              <span id="frameworks">
                {section["frameworks"].map((tag, index) => (
                  <button
                    key={index}
                    className={
                      props.filteredTag(tag)
                        ? "inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        : "inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }
                    onClick={(e) => props.onClick(tag, e)}
                  >
                    {tag}
                  </button>
                ))}
              </span>
            )}
            <h4>
              Use Cases{" "}
              <button
                type="button"
                onClick={() => {
                  props.setUse(!props.showUse);
                }}
              >
                {" "}
                <ChevronDownIcon className=" h-5 w-3 " />
              </button>
            </h4>
            {props.showUse && (
              <span id="usecases">
                {section["usecases"].map((tag, index) => (
                  <button
                    key={index}
                    className={
                      props.filteredTag(tag)
                        ? "inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        : "inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }
                    onClick={(e) => props.onClick(tag, e)}
                  >
                    {tag}
                  </button>
                ))}
              </span>
            )}
            <h4>
              Other{" "}
              <button
                type="button"
                onClick={() => {
                  props.setOther(!props.showOther);
                }}
              >
                {" "}
                <ChevronDownIcon className=" h-5 w-3 " />
              </button>
            </h4>
            {props.showOther && (
              <span id="other">
                {section["other"].map((tag, index) => (
                  <button
                    key={index}
                    className={
                      props.filteredTag(tag)
                        ? "inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        : "inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }
                    onClick={(e) => props.onClick(tag, e)}
                  >
                    {tag}
                  </button>
                ))}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LeftBar;

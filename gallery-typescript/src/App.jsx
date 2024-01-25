import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import LeftBar from "./components/LeftBar";
import parse from "html-react-parser";
import axios from "axios";

import "./App.css";
import "./index.css";
import "./output.css";

function App(props) {
  const [filters, setFilters] = useState([]);
  const [update, setUpdate] = useState(true);
  const [home, setHome] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [showLang, setLang] = useState(false);
  const [showAPI, setAPI] = useState(false);
  const [showFrame, setFrame] = useState(false);
  const [showInt, setInt] = useState(false);
  const [showTech, setTech] = useState(false);
  const [showUse, setUse] = useState(false);
  const [showOther, setOther] = useState(false);
  const [section, setSection] = useState({});
  const [readme, setReadme] = useState(undefined);

  const showHide = {
    showAPI: showAPI,
    setAPI: setAPI,
    showLang: showLang,
    setLang: setLang,
    showInt: showInt,
    setInt: setInt,
    showTech: showTech,
    setTech: setTech,
    showOther: showOther,
    setOther: setOther,
    showFrame: showFrame,
    setFrame: setFrame,
    showUse: showUse,
    setUse: setUse,
  };

  const fetchHomeApps = async () => {
    let filterlist = filters.join(",");
    let tagstring = "";
    if (filters.length !== 0) {
      tagstring = "?tag=" + filterlist;
    }

    if (update) {
      setUpdate(false);

      const response = await axios.get(
        "/.netlify/functions/getApps" + tagstring
      );

      setHome(response.data);

      if (readme === undefined) {
        setReadme({});

        let newReadme = {};
        console.log("Getting all readmes");
        const results = await axios.get("/.netlify/functions/getAllReadmes");
        for (let entry in results.data) {
          const readmeid = results.data[entry]["_id"];
          let cleanHTML = results.data[entry]["readme"];
          newReadme[readmeid] = parse(cleanHTML);
        }
        setReadme(newReadme);
      }
    }
  };

  const fetchTags = async (filterlist) => {
    let newSection = {};

    if (!section["languages"]) {
      const response = await axios.get("/.netlify/functions/getTags");
      for (let entry in response.data) {
        let label = response.data[entry]["_id"];
        let value = response.data[entry]["tags"];
        newSection[label] = value;
      }
      setSection(newSection);
    }
  };

  fetchHomeApps();

  const handleSimilarSearch = async (searchApp, e) => {
    e.preventDefault();
    const response = await axios.get(
      "/.netlify/functions/searchApps?similar=" + searchApp
    );

    setHome(response.data);
  };

  const resetFilters = () => {
    setAPI(false);
    setLang(false);
    setInt(false);
    setTech(false);
    setOther(false);
    setFrame(false);
    setUse(false);
    setFilters([]);
  };

  useEffect(() => {
    let filterlist = filters.join(",");
    setUpdate(true);
    fetchTags(filterlist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchString]);

  useEffect(() => {
    console.log("Re-rendering");
  }, [showLang, showAPI, showTech, showInt, showOther, showFrame]);

  function filteredTag(tagname) {
    return filters.indexOf(tagname) !== -1;
  }

  const handleFilters = (tagname, e) => {
    e.preventDefault();

    if (section === {}) {
      console.log("RETURNNOTDONE");
      return;
    }
    console.log("HANDLEFILTERS for " + tagname);
    // Open the left hand nav section for
    // the tag that was selected
    if (section["languages"].includes(tagname)) {
      setLang(true);
    } else if (section["technology"].includes(tagname)) {
      setTech(true);
    } else if (section["integrations"].includes(tagname)) {
      setInt(true);
    } else if (section["apis"].includes(tagname)) {
      setAPI(true);
    } else if (section["frameworks"].includes(tagname)) {
      setFrame(true);
    } else if (section["usecases"].includes(tagname)) {
      setUse(true);
    } else {
      setOther(true);
    }

    console.log("FILTERS" + filters);
    if (filters) {
      if (filteredTag(tagname)) {
        setFilters(filters.filter((item) => item !== tagname));
      } else {
        setFilters((arr) => [...arr, tagname]);
      }
    }
  };

  return (
    <>
      <HashRouter>
        <div className="row">
          <LeftBar
            filters={filters}
            onClick={handleFilters}
            section={section}
            filteredTag={filteredTag}
            showHide={showHide}
            setLang={setLang}
            setUse={setUse}
            showUse={showUse}
            setFrame={setFrame}
            showFrame={showFrame}
            setInt={setInt}
            showInt={showInt}
            showLang={showLang}
            showTech={showTech}
            setTech={setTech}
            showAPI={showAPI}
            setAPI={setAPI}
            showOther={showOther}
            setOther={setOther}
            resetFilters={resetFilters}
            searchString={searchString}
            setSearchString={setSearchString}
          />
          <div name="gallery cards" className="col-9">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    apps={home}
                    filters={filters}
                    filteredTag={filteredTag}
                    handleSimilarSearch={handleSimilarSearch}
                    showHide={showHide}
                    readme={readme}
                    onClick={handleFilters}
                    {...props}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </>
  );
}

export default App;

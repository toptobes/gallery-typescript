import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import Header from "./components/Header";
import StarterApps from "./pages/StarterApps";
import DataTools from "./pages/DataTools";
import LeftBar from "./components/LeftBar";
import parse from "html-react-parser";

import axios from "axios";

import "./App.css";
import "./index.css";
import "./output.css";

function App(props) {
  const [filters, setFilters] = useState([]);
  const [datatools, setDataTools] = useState([]);
  const [starters, setStarters] = useState([]);
  const [update, setUpdate] = useState(true);
  const [workshops, setWorkshops] = useState([]);
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
      console.log("RESPONSE DATA" + response.data);
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

  const fetchWorkshops = async (filterlist) => {
    if (workshops.length === 0) {
      const response = await axios.get(
        "/.netlify/functions/getApps?tag=workshop"
      );
      setWorkshops(filterApps(response.data));
    }
  };

  const fetchStarters = async (filterlist) => {
    if (starters.length === 0) {
      const response = await axios.get(
        "/.netlify/functions/getApps?tag=starter"
      );
      setStarters(filterApps(response.data));
    }
  };

  const fetchDataTools = async (filterlist) => {
    if (datatools.length === 0) {
      const response = await axios.get("/.netlify/functions/getApps?tag=tools");
      setDataTools(filterApps(response.data));
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
    console.log("FITTERS" + filters);
    let filterlist = filters.join(",");
    setUpdate(true);
    fetchWorkshops(filterlist);
    fetchStarters(filterlist);
    fetchHomeApps(filterlist);
    fetchDataTools(filterlist);
    fetchTags(filterlist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchString]);

  useEffect(() => {
    console.log("Re-rendering");
  }, [showLang, showAPI, showTech, showInt, showOther, showFrame, workshops]);

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

  const filterApps = (filterapps) => {
    let slugdone = [];
    if (filters.length === 0) {
      return filterapps;
    }

    let newapps = [];
    // eslint-disable-next-line
    apploop: for (const app of filterapps) {
      if (
        !app["urls"] ||
        !app["urls"]["github"] ||
        app["urls"]["github"].length === 0
      ) {
        //eslint-disable-next-line
        continue apploop;
      }
      const slug = app["_id"];

      for (const tag of filters) {
        if (app.tags.indexOf(tag) === -1) {
          // eslint-disable-next-line
          continue;
        }
      }
      if (searchString !== "") {
        const readmetext = JSON.stringify(readme[slug]);

        //console.log(searchString + "is searchString");
        if (readmetext) {
          const appReadMe = readmetext.toLowerCase();
          if (!appReadMe.includes(searchString.toLowerCase())) {
            // eslint-disable-next-line
            continue apploop;
          }
        }
      }

      if (slugdone.includes(slug)) {
        continue;
      }
      newapps.push(app);
      slugdone.push(slug);
    }
    newapps.sort((a, b) => b.stargazers - a.stargazers);
    return newapps;
  };

  return (
    <>
      <HashRouter>
        <Header />
        <div className="row">
          <LeftBar
            filters={filters}
            onClick={handleFilters}
            section={section}
            filteredTag={filteredTag}
            showHide={showHide}
            setLang={setLang}
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
                path="/workshops"
                element={
                  <Workshops
                    apps={workshops}
                    filters={filters}
                    filteredTag={filteredTag}
                    showHide={showHide}
                    onClick={handleFilters}
                    {...props}
                  />
                }
              />
              <Route
                path="/starters"
                element={(props) => (
                  <StarterApps
                    apps={starters}
                    filters={filters}
                    onClick={handleFilters}
                    filteredTag={filteredTag}
                    showHide={showHide}
                    {...props}
                  />
                )}
              ></Route>
              <Route
                path="/datatools"
                element={
                  <DataTools
                    apps={datatools}
                    filteredTag={filteredTag}
                    showHide={showHide}
                    filters={filters}
                    onClick={handleFilters}
                    {...props}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Home
                    apps={home}
                    filters={filters}
                    filteredTag={filteredTag}
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

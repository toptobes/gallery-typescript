import React, { useState } from "react";

import Modal from "./Modal.js";
import DropDown from "./DropDown.js";

const Card = (props) => {
  let application = props.application;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="d-flex align-items-center mt-2 flex-wrap flex-col align-items-start">
      <div
        key={application.name}
        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow h-full w-full"
      >
        <div className="flex flex-1 flex-col p-8">
          <div className="heroimage" onClick={() => setShowModal(true)}>
            {application?.urls?.heroimage && (
              <img
                className="mx-auto flex-shrink-0"
                src={application.urls.heroimage}
                alt={application.name}
                width="100px"
              />
            )}
          </div>
          <h3 className="mt-6 text-sm font-medium text-gray-900">
            <a
              target="_blank"
              rel="noreferrer"
              href={application?.urls?.github}
            >
              {application.name}
            </a>
          </h3>
          <dl className="mt-1 flex flex-grow flex-col">
            <div className="extra-small text-night-300">
              {application.duration && (
                <>
                  <i className="icon icon--clock icon--night-300 card-gallery__header-icon"></i>
                  {application.duration}
                </>
              )}
              <i className="icon icon--user icon--night-300 card-gallery__header-icon"></i>{" "}
              {application.skilllevel}
              <br />
              Stars: {application.stargazers_count}&nbsp; Forks:{" "}
              {application.forks_count}
              <br />
              {application.views && (
                <>
                  <span> Viewers: {application.views} </span>
                  <span> Likes: {application.likes} </span>
                  <br />
                </>
              )}
              {application.last_modified}
              <br />
              <p className="mt-6 text-sm font-medium text-gray-900">
                {application.description}
              </p>
            </div>

            <dt className="sr-only">Tags:</dt>
            <dd className="text-sm text-gray-500 p-2">
              {application?.tags?.map((tagname, index) => (
                <button
                  key={index + "-" + tagname}
                  className={
                    props.filteredTag(tagname)
                      ? "btn btn-primary btn-sm"
                      : "btn btn-outline-primary btn-sm"
                  }
                  onClick={(e) => props.onClick(tagname, e)}
                >
                  {tagname}
                </button>
              ))}
            </dd>
          </dl>
          <div className="row float-right">
            <div className="col-auto float-right">
              <Modal
                application={application}
                filteredTag={props.filteredTag}
                slugs={props.slugs}
                readme={props.readme}
                setSlugs={props.setSlugs}
                showModal={showModal}
                setShowModal={setShowModal}
                getReadme={props.getReadme}
              />
              <DropDown
                application={application}
                setShowModal={setShowModal}
                handleSimilarSearch={props.handleSimilarSearch}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="break" />
    </div>
  );
};

export default Card;

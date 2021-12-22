import React, { useState, useEffect } from "react";
import { BiPhoneIncoming } from "react-icons/bi";

const Info = (props) => {

  const mapObject = () => {
    const mapped = props.visible.map((call, index) => {
        return (
          <div className="call-container" key={index}>
            <div className="date" style={{ fontSize: 11, color: "gray" }}>
              {call.created_at.substring(0, 10)}
            </div>
  
            <div
              className="call"
              key={call.id}
              onClick={() => {
                props.showCalls ? props.archiveCall(call.id) : props.unArchiveCall(call.id);
              }}
            >
              <div style={{ marginLeft: 10, marginRight: 10, width: 20 }}>
                <BiPhoneIncoming style={{ color: "red", width: 20 }} />
              </div>
  
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {call.from}
                <div
                  style={{
                    fontWeight: "500",
                    marginTop: 5,
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  tried to call on {call.to}
                </div>
              </div>
  
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                  color: "gray",
                  fontSize: 12,
                }}
              >
                {props.formatTime(call.created_at.substring(11, 16))}
              </div>
            </div>
          </div>
        );
      });
      return mapped
  }

  return (
      <div className='info-container'>
        {mapObject()}
      </div>
   
  );
};

export default Info;

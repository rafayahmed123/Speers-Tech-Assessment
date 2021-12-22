import React, { useState, useEffect } from "react";
import { BiPhoneIncoming } from "react-icons/bi";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import Info from "./Info.jsx";

const App = () => {
  const [calls, setCalls] = useState([]);
  const [archived, setArchived] = useState([]);
  const [visible, setVisible] = useState([]);

  const [showCalls, setShowCalls] = useState(true);

  useEffect(() => {
    fetch("https://aircall-job.herokuapp.com/activities")
      .then((res) => res.json())
      .then((result) => {
        setCalls(result);
        setVisible(result);
      });
  }, []);

  const archiveCall = (id) => {
    calls.forEach((call) => {
      if (call.id === id) {
        call.is_archived = true;
      }
    });

    let archivedCalls = [];
    let newCalls = [];

    calls.filter((call, index) => {
      if (call.is_archived) {
        console.log("false" + index);
        archivedCalls.push(call);
      } else {
        newCalls.push(call);
      }
    });

    archived.forEach((call) => {
      archivedCalls.push(call);
    });

    setCalls(newCalls);
    setArchived(archivedCalls);

    setVisible(newCalls);
  };

  const unArchiveCall = (id) => {
    archived.forEach((call) => {
      //changing selected archived call property
      if (call.id === id) {
        call.is_archived = false;
      }
    });

    let archivedCalls = [];
    let newCalls = [];

    archived.filter((call, index) => {
      //setting up updated calls and archived
      if (!call.is_archived) {
        newCalls.push(call);
      } else {
        archivedCalls.push(call);
      }
    });

    calls.forEach((call) => {
      newCalls.push(call);
    }); //adding in any remaining calls

    setCalls(newCalls);
    setArchived(archivedCalls);

    setVisible(archivedCalls);
  };

  const archiveAll = () => {
    let archivedCalls = [];
    let newCalls = [];

    calls.forEach((call) => {
      //changing selected archived call property
      call.is_archived = true;
      archivedCalls.push(call);
    });

    archived.forEach((call) => {
      archivedCalls.push(call);
    });

    setArchived(archivedCalls);

    setCalls(newCalls);
    setVisible(newCalls);
  };

  const unArchiveAll = () => {
    let archivedCalls = [];
    let newCalls = [];

    archived.forEach((call) => {
      //changing selected archived call property
      call.is_archived = false;
      newCalls.push(call);
    });

    calls.forEach((call) => {
      newCalls.push(call);
    });

    setCalls(newCalls);

    setArchived(archivedCalls);
    setVisible(archivedCalls);
  };

  const showArchived = () => {
    setVisible(archived);
    setShowCalls(false);
  };

  const showInbox = () => {
    setVisible(calls);
    setShowCalls(true);
  };
         

  return (
    <div className="container">
      <Header archived={showArchived} inbox={showInbox} />
      <div className="archive-all-container">
        {showCalls ? (
          <div
            className="archive-all-btn"
            onClick={() => {
              archiveAll();
            }}
          >
            Archive All Calls
          </div>
        ) : (
          <div
            className="archive-all-btn"
            onClick={() => {
              unArchiveAll();
            }}
          >
            Unarchive All Calls
          </div>
        )}
      </div>
      <div className="container-view">
        <Info visible={visible} calls={calls} showCalls={showCalls} archiveCall={archiveCall} unArchiveCall={unArchiveCall}/>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;

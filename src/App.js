import logo from "./logo.svg";
import "./App.css";

import Routing from "./Routing/Routing";
import { onValue, ref } from "firebase/database";
import { database } from "./firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserBlockAndUnblock } from "./redux/action";
import { AllJobsArray, AvailableJobs } from "./firebase/AvailableJobs"
function App() {

  const dispatch = useDispatch()
  const { uid, role } = useSelector((state) => state.user)



  useEffect(() => {


    if (uid) {

      if (role === "student") {

        const starCountRef = ref(database, `student/${uid}`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          // console.log("app==>", data)
          dispatch(UserBlockAndUnblock({ blocked: data?.blocked, approved: data?.approved }))
          if (data?.approved && !data?.blocked && data?.role === "student") {
            AvailableJobs(dispatch, uid)
            // console.log("dsd")
          } else {
            console.log("else runs")
          }
        });



      } else {
        const starCountRefCompany = ref(database, `company/${uid}`);
        onValue(starCountRefCompany, (snapshot) => {
          const data = snapshot.val();
          // console.log("==>", data)
          dispatch(UserBlockAndUnblock({ blocked: data?.blocked, approved: data?.approved }))
        })






        // const starCountRefPost = ref(database, 'postedJobs/');
        // onValue(starCountRefPost, (snapshot) => {
        //   AllJobsArray(uid, dispatch)
        // })


      }

    }





  }, [uid])


  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;

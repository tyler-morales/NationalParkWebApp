import HomePage from "./components/HomePage/home-page";
import ParkResultsPage from "./components/ParkComponents/park-result-page";
import ParkPage from "./components/ParkComponents/park-page";
import AboutPage from "./components/AboutPage/AboutPage";
import { useState } from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import RockClimbingList from "./components/ParkComponents/activity-list";
import useGetNpsNews from "./hooks/use-get-nps-news";
import FAQPage from "./components/FAQPage/FAQPage";
import AccountPage from "./components/AccountPage/AccountPage";
import useUser from "./hooks/use-user";
import { auth } from "./firebase/firebase";
import EventsPage from "./components/EventsPage/EventsPage";

function App() {
  const [searchBarParams, setSearchBarParams] = useState([]);

  const searchBarCallback = (childData) => {
    setSearchBarParams(childData);
  };
  const [isLoading, error, user] = useUser(auth);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage callback={searchBarCallback} user={user} />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/events">
          <EventsPage />
        </Route>
        <Route path="/faq">
          <FAQPage />
        </Route>
        <Route path="/account" component={AccountPage} user={user} />
        <Route path="/park/:code" children={<SetParkPage />} />
        <Route path="/activities/:activity" children={<SetActivitiesPage />} />
        <Route path="/results">
          <ParkResultsPage search={searchBarParams} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function SetParkPage() {
  let { code } = useParams();
  return <ParkPage parkCode={code}></ParkPage>;
}

function SetActivitiesPage() {
  let { activity } = useParams();
  return <RockClimbingList activity={activity} />;
}

export default App;

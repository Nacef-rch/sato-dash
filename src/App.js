import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './layout';
import HResource from './containers/Employee';
import Department from './containers/Department';
import SignIn from './containers/Auth';
import InitData from './containers/Auth/InitData';
import ProfileContainer from './containers/Profile';
import CalenderContainer from './containers/Calendar';
import LeaveContainer from './containers/Leave';
import StatDash from './containers/Dashboard';
import OnBoardContainer from './containers/OnBoard';
import StatsContainer from './containers/Stats';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/init" element={<InitData />} />

        <Route path="/" element={<Layout />}>
          {/* <Route index element={<HResource />} /> */}
          {/* <Route index element={<CalenderContainer />} /> */}
          {/* <Route index element={<LeaveContainer />} /> */}
          {/* <Route index element={<ProfileContainer />} /> */}
          <Route index element={<StatsContainer />} />
          <Route path="/stats" element={<StatsContainer />} />
          <Route path="/board" element={<OnBoardContainer />} />
          <Route path="/stats2" element={<StatDash />} />
          <Route path="/calendar" element={<CalenderContainer />} />
          <Route path="/leave" element={<LeaveContainer />} />
          <Route path="/profile" element={<ProfileContainer />} />
          <Route path="/Dep" element={<Department />} />
          <Route path="/employee" element={<HResource />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

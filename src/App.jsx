import styles from './App.module.sass';
import {Navbar} from "./componenets/Navbar/Navbar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Notes} from "./pages/Notes/Notes";
import {Categories} from "./pages/Categories/Categories";
import {Labels} from "./pages/Labels/Labels";

export const App = () => {

    return (
        <Router>
            <div className={styles.App}>

            <Navbar/>

            <Switch>
              <Route exact path={'/'}>
                  <Notes/>
              </Route>
              <Route path={'/categories'}>
                  <Categories/>
              </Route>
              <Route path={'/labels'}>
                  <Labels/>
              </Route>
            </Switch>

            </div>
        </Router>
    );
}



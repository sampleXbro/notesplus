import styles from './App.module.sass'
import {Notes} from "./pages/Notes/Notes"
import {Labels} from "./pages/Labels/Labels"
import {Navbar} from "./componenets/Navbar/Navbar"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Categories} from "./pages/Categories/Categories"

export const App = () => {

    return (
        <Router basename={'/notesplus'}>
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



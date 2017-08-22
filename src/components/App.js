import React from 'react';
import { connect } from 'react-redux';

import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';
import Grid from 'material-ui/Grid';
import 'typeface-roboto';

import AppCard from './AppCard';
import './App.css';


const styles = {
  gridContainerDiv: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
  },
};

const App = ({display}) => (
  <div className="appContainerDiv">
    <AppDrawer />
    <AppHeader />
    <div style={ styles.gridContainerDiv }>
      <Grid container spacing={ 24 }>
        { display.cards.map((card, i) => (
          card.isMount &&
          <Grid item xs key={ i }>
            <AppCard index={ i } />
          </Grid>
        )) }
      </Grid>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => ({
  display: state.display,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

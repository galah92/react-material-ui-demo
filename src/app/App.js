import React from 'react';
import { connect } from 'react-redux';

import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';
import Grid from 'material-ui/Grid';
import 'typeface-roboto';

import AppCard from './AppCard';
import '../styles/App.css';


const styles = {
  appContainerDiv: {
    backgroundColor: "#EEEEEE",
  },
  gridContainerDiv: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
  },
};

const App = (props) => (
  <div className="appContainerDiv" style={ styles.appContainerDiv }>
  <AppDrawer />
  <AppHeader />
  <div style={ styles.gridContainerDiv }>
    <Grid container spacing={ 24 }>
      { props.display.cards.map((card, i) => (
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

import React, { Component } from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';


class SelectedMenuListItem extends Component {

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleMenuItemClick = (index) => {
    this.setState({ open: false });
    this.props.onClick(index);
  };

  render() {
    return (
      <div>
        <ListItem
          button
          onClick={ e => this.setState({ open: true, anchorEl: e.currentTarget }) }
          disabled={ this.props.disabled }
        >
          <ListItemText
            primary={ this.props.label }
            secondary={ this.props.options[this.props.value] }
          />
        </ListItem>
        <Menu
          anchorEl={ this.state.anchorEl }
          open={ this.state.open }
          onRequestClose={ () => this.setState({ open: false }) }
        >
          {
            this.props.options.map((option, index) => (
              <MenuItem
                key={ option }
                selected={ index === this.props.value }
                onClick={ () => this.handleMenuItemClick(index) }
              >
                {option}
              </MenuItem>
            ))
          }
        </Menu>
      </div>
    );
  }
}

export default SelectedMenuListItem;

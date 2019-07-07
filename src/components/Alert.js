import React, { Fragment } from 'react';
import { useAlert } from 'react-alert';
import '../styles/Alert.css';

const Alert = props => {
  const alert = useAlert();
  const trigger = e => {
    props.handleRefresh(e);
  };

  return (
    <Fragment>
      <button
        className="refreshButt"
        onClick={e => {
          alert.success('Data refreshed!');
          trigger(e);
        }}>
        <i className="ui redo alternate icon" />
      </button>
    </Fragment>
  );
};

export default Alert;

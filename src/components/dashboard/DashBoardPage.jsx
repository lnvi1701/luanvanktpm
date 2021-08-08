import React from "react";
import { useEffect } from "react";
import "./dashboardPage.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function DashBoardPage(props) {
  const history = useHistory();

  useEffect(() => {
    const checkUser = () => {
      const { user } = props;
      if (!user) {
        history.push("/login");
      }
    };
    checkUser();
  });

  return (
    <div className="dashboardContainer">
      {props.user && props.user.first_name}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(DashBoardPage);

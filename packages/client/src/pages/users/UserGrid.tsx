import { observer } from "mobx-react-lite";
import React from "react";
import { useQuery } from "react-query";
import DefaultPage from "../DefaultPage";
import api from "../../app/api/agent";
import { UsersResponse } from "../../app/models/user";

const UserGrid = () => {
  const { data, isLoading, error } = useQuery<any, any, UsersResponse, any>(
    ["users"],
    () => api.User.get({}),
    {
      retry: false,
    }
  );

  return (
    <DefaultPage>
      <div>UserGrid</div>
    </DefaultPage>
  );
};

export default observer(UserGrid);

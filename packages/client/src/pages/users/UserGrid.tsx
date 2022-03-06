import { observer } from "mobx-react-lite";
import React from "react";
import { useQuery } from "react-query";
import DefaultPage from "../DefaultPage";
import api from "../../app/api/agent";
import { roleTranslationMapper, UsersResponse } from "../../app/models/user";
import GridTable from "../../components/Table/GridTable";
import GridTableHeader, {
  GridTableHeaderEntry,
} from "../../components/Table/GridTableHeader";
import GridTableBody from "../../components/Table/GridTableBody";
import { useTranslation } from "react-i18next";

const headers: GridTableHeaderEntry[] = [
  { key: "email", label: "user.grid.email" },
  { key: "name", label: "user.grid.name" },
  { key: "lastname", label: "user.grid.lastname" },
  { key: "role", label: "user.grid.role" },
  { key: "action", label: "user.grid.actions", isAction: true },
];

const UserGrid = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery<any, any, UsersResponse, any>(
    ["users"],
    () => api.User.get({}),
    {
      retry: false,
    }
  );

  return (
    <DefaultPage>
      {error && <div>{error.data.message}</div>}
      {isLoading === true && <div>Loading...</div>}
      {data !== undefined && (
        <GridTable
          headers={headers}
          entries={data?.users.map((u) => ({
            id: u.id,
            email: u.email,
            name: u.name,
            lastname: u.surname,
            role: t(roleTranslationMapper(u.userRoleId)),
          }))}
        />
      )}
    </DefaultPage>
  );
};

export default observer(UserGrid);

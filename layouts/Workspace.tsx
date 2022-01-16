import React, { FC, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';

import fetcher from '@utils/fetcher';

const Workspace: FC = ({ children }) => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 1000000,
  });

  const onLogout = useCallback((e) => {
    e.preventDefault();
    axios.post('http://localhost:3095/api/users/logout', null, { withCredentials: true }).then(() => {
      mutate(false, false);
    });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;

import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { routes } from "../routes";

const Render = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;

  > li {
    padding: 10px 5px;
  }
`;

function Breadcrumb() {
  const location = useLocation();

  const items = useMemo(() => {
    const index = routes.findIndex((route) => route.path === location.pathname);

    return routes.slice(0, index + 1);
  }, [location]);

  return (
    <Render>
      {items.map((item, idx) => (
        <React.Fragment key={item.path}>
          {idx < items.length - 1 ? (
            <>
              <li>
                <a href={item.path}>{item.name}</a>
              </li>
              <li>{">"}</li>
            </>
          ) : (
            <li>
              <span>{item.name}</span>
            </li>
          )}
        </React.Fragment>
      ))}
    </Render>
  );
}

export default Breadcrumb;

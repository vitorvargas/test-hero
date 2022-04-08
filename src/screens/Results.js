import { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { useTable } from "react-table";

const Render = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWithSort = styled.div``;

const Results = (props) => {

  const fetchData = (page = 0, sorted) => {
    props.getHeros({
      page: page,
      sorted: sorted ?? props.sorted,
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: () => {
          const isSorted = !!props.sorted;
          const isAsc = (props.sorted || "").startsWith('-');

          return (
            <HeaderWithSort onClick={() => {
              if (!isSorted || !isAsc) {
                fetchData(0, '-name');
              } else {
                fetchData(0, 'name');
              }
            }}>
              <span>Hero Name</span>
              {isSorted && (
                <span>{props.sorted.startsWith("-") ? " 🔽" : " 🔼"}</span>
              )}
            </HeaderWithSort>
          );
        },
        accessor: "name",
      },
      {
        Header: "Hero Image",
        accessor: "thumbnail",
        Cell: ({ value }) => {
          return (
            <img src={`${value.path}.${value.extension}`} alt="" height={50} />
          );
        },
      },
      {
        Header: "Quantity",
        accessor: props.likeMore,
        Cell: ({ value }) => {
          return <span>{value?.available}</span>;
        },
      },
    ],
    [props.likeMore, props.sorted]
  );


  useEffect(() => {
    fetchData();
  }, [props.name]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: props.list,
    });

  const canPrev = useMemo(() => props.page > 0, [props.page]);
  const canNext = useMemo(
    () => props.page * props.pageSize < props.total,
    [props.page, props.pageSize, props.total]
  );
  const lastPage = useMemo(
    () => Math.floor(props.total / props.pageSize) + 1,
    [props.pageSize, props.total]
  );

  if (props.loading) return <div>Loading...</div>;

  if (props.error) return <div>{props.error}</div>

  return (
    <Render>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => fetchData(0)} disabled={!canPrev}>
          {"<<"}
        </button>{" "}
        <button onClick={() => fetchData(props.page - 1)} disabled={!canNext}>
          {"<"}
        </button>{" "}
        <button onClick={() => fetchData(props.page + 1)} disabled={props.page}>
          {">"}
        </button>{" "}
        <button onClick={() => fetchData(lastPage - 1)} disabled={!canNext}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {props.page + 1} of {lastPage}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={props.page + 1}
            value={props.page + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              fetchData(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
      </div>
    </Render>
  );
};

const mapState = (state) => ({
  name: state.query.name,
  likeMore: state.query.likeMore,
  list: state.data.list,
  loading: state.data.loading,
  page: state.data.page,
  pageSize: state.data.pageSize,
  total: state.data.total,
  sorted: state.data.sorted,
  error: state.data.error
});

const mapDispatch = (dispatch) => ({
  getHeros: (query) => dispatch.data.getHeros(query),
});

export default connect(mapState, mapDispatch)(Results);

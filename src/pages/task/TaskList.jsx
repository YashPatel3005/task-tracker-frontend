import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { ConformationModal } from "../../components/ConformationModal";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TaskDetails from "../../components/TaskDetails";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteTaskAsyncHandler, getAllTasksAsyncHandler } from "./task.slice";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

function TaskList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isFetching, tasks } = useAppSelector((state) => state.task);

  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!addTask) {
      dispatch(getAllTasksAsyncHandler({ page: page + 1, limit: rowsPerPage }));
    }
  }, [addTask, dispatch, page, rowsPerPage]);

  if (addTask) {
    return <TaskDetails setAddTask={setAddTask} />;
  }

  if (editTask) {
    return <TaskDetails setAddTask={setEditTask} />;
  }

  const getTableData = () => {
    if (tasks?.tasks?.length === 0) {
      return (
        <TableRow hover>
          <TableCell className="empty-table" colSpan="4">
            No Task found
          </TableCell>
        </TableRow>
      );
    }
    return (tasks?.tasks ?? []).map(
      ({ _id, title, description, priority, status, createdAt }, index) => (
        <TableRow
          hover
          key={_id}
          onClick={() => {
            navigate(`/home/${_id}`);
            setEditTask(true);
            // <TaskDetails setAddTask={setAddTask} />;
          }}
        >
          <TableCell className="pl-4">
            {index + 1 + page * rowsPerPage}
          </TableCell>
          <TableCell className="edite-icon">
            {title}
            {/* {editTask && (
              <Tooltip
               
                title="Edited Task"
                placement="top"
              >
                <EditOutlinedIcon fontSize="small" />
              </Tooltip>
            )} */}
          </TableCell>
          <Tooltip placement="top">
            <TableCell>{description}</TableCell>
          </Tooltip>
          {/* <Tooltip placement="top">
            <TableCell>{TASK_PRIORITY[priority]}</TableCell>
          </Tooltip>
          <Tooltip placement="top">
            <TableCell>{TASK_STATUS[status]}</TableCell>
          </Tooltip> */}
          <Tooltip placement="top">
            <TableCell>
              {moment(createdAt, "x").format("MM/DD/YYYY HH:MM:SS a")}
            </TableCell>
          </Tooltip>
          <TableCell>
            <Button
              className="select-table-btn"
              onClick={(e) => {
                e.stopPropagation();
                setEditId(_id);
                setDeleteModal(true);
              }}
            >
              <DeleteOutlinedIcon />
            </Button>
          </TableCell>
        </TableRow>
      )
    );
  };
  return (
    <>
      {isFetching && <Loader />}
      <Box className="d-flex">
        <Typography variant="h6" component="div">
          Task List <span>({tasks?.tasks?.length})</span>
        </Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={() => setAddTask(true)}
        >
          Add Task
        </Button>
      </Box>
      <Card className="tabel-list">
        <CardContent style={{ padding: "0" }}>
          <TableContainer>
            <Table size="medium" className="select-table">
              <TableHead>
                <TableRow>
                  <TableCell className="pl-4">#</TableCell>
                  <TableCell sortDirection={false}>
                    {/* <TableSortLabel
                      active={
                        titleSortingtype === "asc" ||
                        titleSortingtype === "desc"
                      }
                      direction={titleSortingtype === "asc" ? "desc" : "asc"}
                      onClick={() => {
                        setTitleingtype(
                          titleSortingtype === "asc" ? "desc" : "asc"
                        );
                        if (titleSortingtype === "asc") {
                          // dispatch(titleSortAsc());
                        }
                        if (titleSortingtype === "desc") {
                          // dispatch(titleSortDesc());
                        }
                      }}
                    > */}
                    Title
                    {/* </TableSortLabel> */}
                  </TableCell>

                  <TableCell>Description</TableCell>
                  {/* <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell> */}
                  <TableCell>Created Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{getTableData()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 20]}
            component="div"
            count={tasks?.total || 0}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(event.target.value);
              setPage(0);
            }}
          />
        </CardContent>
      </Card>
      {deleteModal && (
        <ConformationModal
          onClickYes={() => {
            dispatch(deleteTaskAsyncHandler({ id: editId }));
            setDeleteModal(false);
            setEditId(null);
            dispatch(
              getAllTasksAsyncHandler({ page: page + 1, limit: rowsPerPage })
            );
          }}
          isOpen={deleteModal}
          modalHeader="Are you sure you want to Delete Task"
          onClose={() => {
            setDeleteModal(false);
            setEditId(null);
          }}
        />
      )}
    </>
  );
}

export default TaskList;

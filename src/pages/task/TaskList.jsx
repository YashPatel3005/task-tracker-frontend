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
  TableSortLabel,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ConformationModal } from "../../components/ConformationModal";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TaskDetails from "../../components/TaskDetails";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllTasksAsyncHandler } from "./task.slice";
import { STATUS } from "../../components/common/model/common.model";
import Loader from "../../components/common/Loader";

function TaskList() {
  const dispatch = useAppDispatch();

  const { isTaskFetch, tasks = [] } = useAppSelector((state) => state.task);
  console.log(tasks);

  const [addDoc, setAddDoc] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [titleSortingtype, setTitleingtype] = useState(null);

  useEffect(() => {
    dispatch(getAllTasksAsyncHandler());
  }, []);

  if (addDoc) {
    return <TaskDetails {...{ setAddDoc }} />;
  }

  const getTableData = () => {
    if (tasks.length === 0) {
      return (
        <TableRow hover>
          <TableCell className="empty-table" colSpan="4">
            No Task found
          </TableCell>
        </TableRow>
      );
    }
    return (
      rowsPerPage > 0
        ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : tasks
    ).map(({ id, title, description, isEdited }, index) => (
      <TableRow
        hover
        key={id}
        onClick={() => {
          history.push(`/home/${id}`);
          //   dispatch(getSingleDocument(id));
        }}
      >
        <TableCell className="pl-4">{index + 1 + page * rowsPerPage}</TableCell>
        <TableCell className="edite-icon">
          {title}
          {isEdited && (
            <Tooltip
              TransitionComponent={Zoom}
              title="Edited Task"
              placement="top"
            >
              <EditOutlinedIcon fontSize="small" />
            </Tooltip>
          )}
        </TableCell>
        <Tooltip TransitionComponent={Zoom} title={description} placement="top">
          <TableCell>{description}</TableCell>
        </Tooltip>
        <TableCell>
          <Button
            className="select-table-btn"
            onClick={(e) => {
              e.stopPropagation();
              setEditId(id);
              setDeleteModal(true);
            }}
          >
            <DeleteOutlinedIcon />
          </Button>
        </TableCell>
      </TableRow>
    ));
  };
  return (
    <>
      {isTaskFetch === STATUS.PENDING && <Loader />}
      <Box className="d-flex">
        <Typography variant="h6" component="div">
          Task List <span>({tasks.length})</span>
        </Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={() => setAddDoc(true)}
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
                    <TableSortLabel
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
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>Description</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{getTableData()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 20]}
            component="div"
            count={tasks.length}
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
            // delayedAction({
            //   startLoader: () => {
            //     dispatch(isLoadingTrue());
            //   },
            //   onSucces: () => {
            //     dispatch(isLoadingFalse());
            //     dispatch(deleteDocument(editId));
            //     setDeleteModal(false);
            //     setEditId(null);
            //   },
            //   setToast: "Document Deleted",
            // });
          }}
          isOpen={deleteModal}
          modalHeader="Are you sure you want to Delete Document"
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

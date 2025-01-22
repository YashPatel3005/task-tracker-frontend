import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { removeDoubleQuotes } from "../utils/helpers";
import { ConformationModal } from "./ConformationModal";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addTaskAsyncHandler,
  deleteTaskAsyncHandler,
  editTaskAsyncHandler,
  getTaskDetailsAsyncHandler,
} from "../pages/task/task.slice";
import PropTypes from "prop-types";

function TaskDetails({ setAddTask }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: editId } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);

  const { isCreatedLoading, taskDetailData } = useAppSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (editId) {
      dispatch(getTaskDetailsAsyncHandler({ id: editId }));
    }
  }, [editId]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onTouched",
    shouldFocusError: true,
    reValidateMode: "onChange",
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(
      Joi.object({
        title: Joi.string().trim().required().min(5).max(30).label("Title"),
        description: Joi.string()
          .trim()
          .required()
          .min(10)
          .max(120)
          .label("Description"),
      })
    ),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (taskDetailData) {
      reset({
        title: taskDetailData?.title ?? "",
        description: taskDetailData?.description ?? "",
      });
    }
  }, [taskDetailData, reset, editId]);

  const submitForm = async (data) => {
    let res;
    if (editId) {
      res = await dispatch(editTaskAsyncHandler({ id: editId, payload: data }));
    } else {
      res = await dispatch(addTaskAsyncHandler(data));
    }
    if (res) {
      if (setAddTask) {
        setAddTask(false);
      }
      navigate("/home"); // Redirect to the Task List
    }
  };

  return (
    <>
      <Box className="d-flex list-head">
        <Typography variant="h6" component="div">
          {editId ? "Update" : "Add"} Task
        </Typography>
        <div>
          {editId && (
            <Button variant="outlined" onClick={() => setDeleteModal(true)}>
              Delete
            </Button>
          )}
          <Button
            style={{ margin: "0 20px" }}
            variant="outlined"
            onClick={() => {
              if (editId) {
                navigate("/home");
              } else {
                setAddTask(false);
              }
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(submitForm)}
            loading={isCreatedLoading}
            disabled={isCreatedLoading}
          >
            {editId ? "Update" : "Add"} Task
          </Button>
        </div>
      </Box>
      <form className="form-detail">
        <Controller
          control={control}
          name="title"
          render={({ field, onBlur }) => (
            <TextField
              {...field}
              label="Enter Task Title"
              required
              multiline
              fullWidth
              onBlur={onBlur}
              error={errors?.title}
              variant="outlined"
              helperText={
                errors?.title && removeDoubleQuotes(errors?.title.message)
              }
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, onBlur }) => (
            <TextField
              {...field}
              label="Enter Task Description"
              required
              fullWidth
              multiline
              minRows={6}
              onBlur={onBlur}
              error={errors?.description}
              variant="outlined"
              helperText={
                errors?.description &&
                removeDoubleQuotes(errors?.description.message)
              }
            />
          )}
        />
      </form>
      {deleteModal && (
        <ConformationModal
          onClickYes={async () => {
            const res = await dispatch(deleteTaskAsyncHandler({ id: editId }));
            if (res) {
              navigate("/home");
              if (setAddTask) {
                setAddTask(false);
              }
            }
          }}
          isOpen={deleteModal}
          modalHeader="Are you sure you want to Delete Task"
          onClose={() => setDeleteModal(false)}
        />
      )}
    </>
  );
}

TaskDetails.prototypes = {
  setAddTask: PropTypes.func.isRequired,
};

export default TaskDetails;

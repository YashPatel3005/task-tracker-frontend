import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { removeDoubleQuotes } from "../utils/helpers";
import { ConformationModal } from "./ConformationModal";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useAppDispatch, useAppSelector } from "../store/store";
import { STATUS } from "./common/model/common.model";
import Loader from "./common/Loader";
import { addTaskAsyncHandler } from "../pages/task/task.slice";
import { useNavigate, useParams } from "react-router-dom";

function TaskDetails({ setAddDoc }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: editId } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);

  const { isTaskCreate } = useAppSelector((state) => state.task);

  // const { singleDocument = {} } = useSelector((state) => state.documentReducer);

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

  // useEffect(() => {
  //   if (singleDocument?.id) {
  //     reset({
  //       title: singleDocument.title,
  //       description: singleDocument.description,
  //     });
  //   }
  // }, [singleDocument, reset]);

  // useEffect(() => {
  //   if (editId) {
  //     return () => {
  //       dispatch(clearSingleDocument());
  //     };
  //   }
  // }, [dispatch, editId]);
  // const submitForm = (data) => {
  //   if (editId) {
  //     const payload = {
  //       ...data,
  //       id: editId,
  //       isEdited: true,
  //     };

  //     delayedAction({
  //       startLoader: () => {
  //         dispatch(isLoadingTrue());
  //         history.push("/home");
  //       },
  //       onSucces: () => {
  //         dispatch(isLoadingFalse());
  //         dispatch(updateDocument(payload));
  //       },
  //       setToast: "Document Update",
  //     });
  //     return;
  //   }

  //   if (!editId) {
  //     const payload = {
  //       ...data,
  //       id: uuidv4(),
  //       isEdited: false,
  //     };

  //     delayedAction({
  //       startLoader: () => {
  //         dispatch(isLoadingTrue());
  //       },
  //       onSucces: () => {
  //         setAddDoc(false);
  //         dispatch(isLoadingFalse());
  //         dispatch(addDocument(payload));
  //       },
  //       setToast: "Document Added",
  //     });
  //     return;
  //   }
  // };

  const submitForm = async (data) => {
    const res = await dispatch(addTaskAsyncHandler(data));
    console.log(res);

    if (res) {
      // navigate("/home");
      setAddDoc(false);
    }
  };

  return (
    <>
      {isTaskCreate === STATUS.PENDING && <Loader />}
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
                setAddDoc(false);
              }
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(submitForm)}
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
          onClickYes={() => {
            // delayedAction({
            //   startLoader: () => {
            //     dispatch(isLoadingTrue());
            //     setDeleteModal(false);
            //     history.push("/home");
            //   },
            //   onSucces: () => {
            //     dispatch(isLoadingFalse());
            //     dispatch(deleteDocument(editId));
            //   },
            //   setToast: "Document Deleted",
            // });
          }}
          isOpen={deleteModal}
          modalHeader="Are you sure you want to Delete Task"
          onClose={() => setDeleteModal(false)}
        />
      )}
    </>
  );
}

TaskDetails.prototype = {
  setAddDoc: PropTypes.func.isRequired,
};

export default TaskDetails;

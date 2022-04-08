import { Form, Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as Yup from "yup";
import Button from "../components/Button";

const QuestionSchema = Yup.object().shape({
  name: Yup.string()
    .nullable()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  likeMore: Yup.string().nullable().required("Required"),
});

const FormControl = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
`;

const Question = styled.label`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Questions = (props) => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    props.setQuery(values);

    navigate("/results");
  };

  return (
    <Formik
      initialValues={props.query}
      onSubmit={onSubmit}
      validationSchema={QuestionSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormControl>
            <Question htmlFor="name">What is your name?</Question>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" />
          </FormControl>
          <FormControl>
            <Question htmlFor="likeMore">
              What do you like more: comics, series or stories?
            </Question>
            <Field type="text" name="likeMore" id="likeMore" as="select">
              <option></option>
              <option value="comics">Comics</option>
              <option value="series">Series</option>
              <option value="stories">Stories</option>
            </Field>
            <ErrorMessage name="likeMore" component="div" />
          </FormControl>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const mapState = (state) => ({
  query: state.query,
});

const mapDispatch = (dispatch) => ({
  setQuery: (data) => dispatch.query.setQuery(data),
});

export default connect(mapState, mapDispatch)(Questions);

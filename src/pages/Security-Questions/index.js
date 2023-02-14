import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// API
import { allQuestions, deleteQuestion, exportQuestions } from "api/questions";

// Data
import { QuestionTableHead } from "data/question";

// Actions
import {
  saveQuestionsData,
  selectAllQuestions,
  deselectAllQuestions,
} from "store/actions";

// Components
import Header from "shared/Header";
import QuestionItem from "./QuestionItem";
import Loading from "shared/Loading";
import Empty from "shared/Empty";
import TableHead from "shared/Table/TableHead";
import Filters from "shared/Filters";

const Questions = () => {
  const dispatch = useDispatch();

  // Data States
  const questionsDataFromStore = useSelector((state) => state.questionReducer);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [noData, setNoData] = useState(false);

  // Fetch Data
  const fetchData = async (options = {}, refetch = false, page) => {
    if ((!questionsDataFromStore.items.length && !noData) || refetch) {
      setIsFetching(true);

      const fetchQuestions = await allQuestions();
      setIsFetching(false);

      setData(fetchQuestions.data);
      dispatch(
        saveQuestionsData({
          items: fetchQuestions.data,
        })
      );
      if (!fetchQuestions.data.length) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    } else {
      setData(questionsDataFromStore.items);
    }
  };

  const selectAll = (isChecked) => {
    isChecked
      ? dispatch(selectAllQuestions())
      : dispatch(deselectAllQuestions());
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) setData(questionsDataFromStore.items);
  }, [questionsDataFromStore]);

  return (
    <div>
      <Header title="Questions" />
      <div className="pb-3 mb-4">
        <Filters
          reducerName="questionReducer"
          deleteAPI={deleteQuestion}
          exportAPI={exportQuestions}
          fetchFunction={fetchData}
          deselectAction={deselectAllQuestions}
          addBtnURL="/questions/add"
          addBtnName="Question"
        />

        {isFetching ? (
          <Loading />
        ) : noData ? (
          <Empty />
        ) : (
          <div className="mt-4 overflow-x-auto scrollbar">
            <div className="data-wrapper">
              <table className="min-w-full leading-normal">
                <TableHead
                  columns={QuestionTableHead}
                  reducerName="questionReducer"
                  onSelectAll={selectAll}
                  actionFunction={saveQuestionsData}
                />
                <tbody>
                  {data.map((question) => (
                    <QuestionItem question={question} key={question._id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;

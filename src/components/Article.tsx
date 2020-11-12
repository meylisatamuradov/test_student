import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";
import { Button, Col, Container, Row } from "react-bootstrap";

type Props = {
  article: IArticle;
  removeArticle: (article: IArticle) => void;
  editArticle: (article: IArticle) => void;
};
const getFormattedDate = (date:Date)=> {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return day + '-' + month + '-' + year;
}

export const Article: React.FC<Props> = ({ article, removeArticle, editArticle }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const [show, setShow] = React.useState(false);

  const [student, setStudent] =  React.useState({
    id: article.id,
    FIO:article.FIO,
    birth: new Date(parseInt(article.birth.split('-')[2]), parseInt(article.birth.split('-')[1])-1, parseInt(article.birth.split('-')[0]) ),
    mark:article.mark
  });

  const deleteArticle = React.useCallback(
    (article: IArticle) => dispatch(removeArticle(article)),
    [dispatch, removeArticle]
  );

  const editArticleUploader = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editArticle({
      ...student,
      birth: getFormattedDate(student.birth)
    }))
    setShow(!show);
  };

  const handleStudentData = (e: React.FormEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.currentTarget.id]: e.currentTarget.value
    });
  };

  const editArticleHandler = () => {
      setShow(!show);
    }
  
  return (
    <div className="Article">
      <Container>
        <Row>
        <Col>
          <div>
            <p><b>Name:</b> {article.FIO}</p>
            <p><b>Birth date:</b> {article.birth}</p>
            <p><b>Mark:</b> {article.mark}</p>
          </div>
        </Col>
        <Col>
          <div className = 'student_buttons_container'>
            <Button variant="secondary"  onClick={editArticleHandler}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteArticle(article)}>
            Delete
            </Button>
            </div>
          </Col>
        </Row>
        
          {
            show && (
            <Row><Col>
            <form onSubmit={editArticleUploader} className="Add-article">
            <input
              type="text"
              id="FIO"
              placeholder="FIO"
              value = {student.FIO}
              onChange={handleStudentData}
            />
          <ReactDatePicker selected={student.birth} 
          dateFormat='dd-MM-yyyy' onChange={(date: Date) => {
            setStudent({
              ...student,
              birth: date
            });
          } } />
            <input
              type="text"
              id="mark"
              placeholder="Mark from 2 to 5"
              value={student.mark}
              onChange={handleStudentData}
              pattern="[2-5]"
            />
            <button className = 'Add-article-button' disabled={article === undefined ? true : false}>
            Update student
            </button>
          </form>
          </Col></Row>
          )
        }

  </Container>
    </div>
  );
};

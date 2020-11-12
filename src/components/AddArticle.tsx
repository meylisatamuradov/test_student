import * as React from "react";
import { Modal } from "react-bootstrap";
import  DatePicker  from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { editArticle } from "../store/actionCreators";

type Props = {
  saveArticle: (article: IArticle | any) => void;
  show : {
    show: boolean,
    action:string,
    articleDefault: IArticle
  };
  handleClose: ()=>void;
};

const getFormattedDate = (date:Date)=> {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return day + '-' + month + '-' + year;
}

export const AddArticle: React.FC<Props> = ({ saveArticle ,show, handleClose }) => {
  const [startDate, setStartDate] = React.useState<Date>( new Date());
  const [article, setArticle] = React.useState<IArticle | {}>({
    birth:getFormattedDate(startDate),
  });
  const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
    setArticle({
      ...article,
      [e.currentTarget.id]: e.currentTarget.value
    });
  };

  const addNewArticle = (e: React.FormEvent) => {
    e.preventDefault();
    saveArticle(article);
    setStartDate(new Date());
    handleClose();
  };
  const dateHandle = (date: Date) =>{
    console.log(date)
    setArticle({
     ...article,
     birth: getFormattedDate(date)
   });
  }

  return (
    <Modal show={show.show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Student</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
    <form onSubmit={addNewArticle} className="Add-article">
      <input
        type="text"
        id="FIO"
        placeholder="FIO"
        onChange={handleArticleData}
      />
     <DatePicker selected={startDate} dateFormat='dd-MM-yyyy' onChange={(date: Date) => {
       setStartDate(date)
     } } onSelect={dateHandle} />
      <input
        type="text"
        id="mark"
        placeholder="Mark from 2 to 5"
        onChange={handleArticleData}
        pattern="[2-5]"
      />
      <button className = 'Add-article-button' disabled={article === undefined ? true : false}>
        {show.action === 'add_student' ? 'Add student' : 'Update student' }
      </button>
    </form>
    </Modal.Body>
  </Modal>
  );
};

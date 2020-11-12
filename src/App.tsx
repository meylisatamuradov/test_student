import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./styles.css";

import { Article } from "./components/Article";
import { AddArticle } from "./components/AddArticle";
import { addArticle, getList, removeArticle, editArticle } from "./store/actionCreators";
import { Dispatch } from "redux";
import { Button } from "react-bootstrap";

const App: React.FC = () => {
  const [articleDefault, setArticle] = React.useState<IArticle>( {
    id:0,
    FIO:'',
    birth:'',
    mark:2
  });

  const [show, setShow] = React.useState( {
   show: false,
   action:'',
   articleDefault
  });

  const handleClose = () => setShow( { show: false, action:'', articleDefault } );
  const handleShow = (e:React.FormEvent) => setShow( { show: true, action: e.currentTarget.id, articleDefault } );



  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const saveArticle = React.useCallback(
    (article: IArticle) => dispatch(addArticle(article)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatch(getList(articleDefault))
  }, [dispatch])

  return (
    <main>
      <h1>Students</h1>
      <Button variant="primary" id='add_student' style={{}} onClick={handleShow}>
        Add student
      </Button>

      <AddArticle saveArticle={saveArticle} show = {show} handleClose={handleClose} />
      { articles.map((article: IArticle) =>  
       (<Article key={article.id} article={article} removeArticle={removeArticle} editArticle={editArticle}/>)
      ) }
    </main>
  );
};

export default App;

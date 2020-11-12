import Axios from "axios";
import * as actionTypes from "./actionTypes";

export function getList(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.GET_LIST,
    article
  };

  return simulateHttpRequest(action);
}

export function addArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.ADD_ARTICLE,
    article
  };

  return simulateHttpRequest(action);
}
export function editArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.EDIT_ARTICLE,
    article
  };

  return simulateHttpRequest(action);
}

export function removeArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.REMOVE_ARTICLE,
    article
  };
  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: ArticleAction) {
  return async (dispatch: DispatchType) => {
    if(action.type === actionTypes.GET_LIST)
    {
      const { data } = await Axios.get('http://localhost:5000/api/students');
      console.log(data)
      data.map((e:IArticle)=> {
        action.article = e
        dispatch(action)
      } )
    }
    else if(action.type === actionTypes.ADD_ARTICLE)
    {
      const { data } = await Axios.post('http://localhost:5000/api/students', action.article);
      action.article.id = data.id
      dispatch(action);
    }else if(action.type === actionTypes.EDIT_ARTICLE)
    {
       await Axios.put('http://localhost:5000/api/students/'+action.article.id, action.article);
      dispatch(action);
    }else if(action.type === actionTypes.REMOVE_ARTICLE)
    {
      await Axios.delete('http://localhost:5000/api/students/'+action.article.id); 
      dispatch(action);
    }
  };
}

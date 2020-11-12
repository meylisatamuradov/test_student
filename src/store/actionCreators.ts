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
const SERVER_URL = 'http://localhost:5000/api/students/';

export function simulateHttpRequest(action: ArticleAction) {
  return async (dispatch: DispatchType) => {
    if(action.type === actionTypes.GET_LIST)
    {
      const { data } = await Axios.get(SERVER_URL);
      console.log(data)
      data.map((e:IArticle)=> {
        action.article = e
        dispatch(action)
      } )
    }
    else if(action.type === actionTypes.ADD_ARTICLE)
    {
      const { data } = await Axios.post(SERVER_URL, action.article);
      action.article.id = data.id
      dispatch(action);
    }else if(action.type === actionTypes.EDIT_ARTICLE)
    {
       const {data } = await Axios.put(SERVER_URL+action.article.id, action.article);
       action.article.mark_name= data.mark_name;
      dispatch(action);
    }else if(action.type === actionTypes.REMOVE_ARTICLE)
    {
      await Axios.delete(SERVER_URL+action.article.id); 
      dispatch(action);
    }
  };
}

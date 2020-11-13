import * as actionTypes from "./actionTypes";

const initialState: ArticleState = {
  articles: []
};

const reducer = (
  state: ArticleState = initialState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
    case actionTypes.GET_LIST:
      let nArticle: IArticle = {
        id: action.article.id, // not really unique but it's just an example
        fio: action.article.fio,
        birth: action.article.birth,
        mark:action.article.mark,
        mark_name: action.article.mark_name
      };
      return {
        ...state,
        articles: state.articles.concat(nArticle)
      };

    case actionTypes.ADD_ARTICLE:
      let newArticle: IArticle = {
        id: action.article.id, // not really unique but it's just an example
        fio: action.article.fio,
        birth: action.article.birth,
        mark:action.article.mark,
        mark_name: action.article.mark_name
      };
      return {
        ...state,
        articles: state.articles.concat(newArticle)
      };

      case actionTypes.EDIT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((e:IArticle)=> e.id === action.article.id ? action.article : e )
      };

    case actionTypes.REMOVE_ARTICLE:
      const updatedArticles: IArticle[] = state.articles.filter(
        (article) => article.id !== action.article.id
      );
      return {
        ...state,
        articles: updatedArticles
      };
  }
  return state;
};

export default reducer;

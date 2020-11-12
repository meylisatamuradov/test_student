interface IArticle {
    id: number;
    FIO: string;
    birth: string;
    mark:number
  }
  
  type ArticleState = {
    articles: IArticle[];
  };
  
  type ArticleAction = {
    type: string;
    article: IArticle ;
  };
  
  type DispatchType = (args: ArticleAction) => ArticleAction;
  
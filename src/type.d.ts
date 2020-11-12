interface IArticle {
    id: number;
    fio: string;
    birth: string;
    mark:number;
    mark_name?:string;
  }
  
  type ArticleState = {
    articles: IArticle[];
  };
  
  type ArticleAction = {
    type: string;
    article: IArticle ;
  };
  
  type DispatchType = (args: ArticleAction) => ArticleAction;
  
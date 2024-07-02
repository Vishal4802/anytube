export interface ContentItem {
  id: string;
  title: string;
  author: string;
  description: string;
  source: string;
}

interface ContentListProps {
  data: ContentItem;
}

export interface User {
  id: string;
  author: string;
  email: string;
  password: string;
}

export interface LogInState {
  isLogIn: boolean;
  currentAuthor: string;
}

export default ContentListProps;

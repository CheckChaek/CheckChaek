import { Book } from './api';

export interface SearchProps {
  onSearchResults: (result: Book[]) => void;
}

export interface SearchResultProps {
  onSearchResults: Book[];
}

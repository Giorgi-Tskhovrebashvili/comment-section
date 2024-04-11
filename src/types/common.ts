export interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string | number;
  count: number;
  isEditing: boolean;
  editedText: string;
}

export interface ButtonType {
  onClick: () => void;
  content: string;
  className: string;
}

export interface InputType {
  type: string;
  placeholder: string;
  value?: string | undefined;
  onChange: (event: any) => void;
  className: string;
}

export interface ImageType {
  className: string;
}

export interface PopupType {
  title: string;
  content: string;
  cancelButton: () => void;
  deleteButton: () => void;
  cancelContent: string;
  deleteContent: string;
}

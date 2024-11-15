export interface DialogData {
  title: string;
  message?: string;
  showProgress?: boolean;
  actionButtonText?: string;
  showActionButton?: boolean;
  showCloseButton?:boolean;
  onAction?: () => void;
}

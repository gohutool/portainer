import { ChangeEvent, createRef } from 'react';

import { Button } from '@@/buttons';
import { Icon } from '@@/Icon';

import styles from './FileUploadField.module.css';

export interface Props {
  onChange(value: File): void;
  value?: File;
  accept?: string;
  title?: string;
  required?: boolean;
  inputId: string;
}

export function FileUploadField({
  onChange,
  value,
  accept,
  title = 'Select a file',
  required = false,
  inputId,
}: Props) {
  const fileRef = createRef<HTMLInputElement>();

  return (
    <div className="file-upload-field vertical-center">
      <input
        id={inputId}
        ref={fileRef}
        type="file"
        accept={accept}
        required={required}
        className={styles.fileInput}
        onChange={changeHandler}
        aria-label="file-input"
      />
      <Button
        size="small"
        color="primary"
        onClick={handleButtonClick}
        className={styles.fileButton}
      >
        {title}
      </Button>

      <span className="vertical-center">
        {value ? value.name : <Icon icon="x" feather mode="danger" />}
      </span>
    </div>
  );

  function handleButtonClick() {
    if (fileRef && fileRef.current) {
      fileRef.current.click();
    }
  }

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      onChange(event.target.files[0]);
    }
  }
}

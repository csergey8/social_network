import React from 'react';
import styles from './FormsControl.module.css';
import { WrappedFieldProps } from 'redux-form';


export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}: WrappedFieldProps) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={hasError ? styles.error : ""}>
            { hasError && <div>
                <span>{meta.error}</span>
            </div>}
            <textarea {...input} {...props} />
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}: WrappedFieldProps) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={hasError ? styles.error : ""}>
            { hasError && <div>
                <span>{meta.error}</span>
            </div>}
            <input  {...input} {...props} />
        </div>
    )
}
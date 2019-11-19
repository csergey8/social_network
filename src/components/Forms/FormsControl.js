import React from 'react';
import styles from './FormsControl.module.css';

export const Textarea = ({input, meta, ...props}) => {
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

export const Input = ({input, meta, ...props}) => {
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
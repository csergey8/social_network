import React, { useState } from 'react';
import classes from './Users.module.css';

type Props = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    portionNumber: number,
    setPortionNumber: (num: number) => void,
    onPageChangeHandler: (num: any) => void
}

const Paginator: React.FC<Props> = ({ totalItemsCount, pageSize, currentPage, portionNumber, setPortionNumber, onPageChangeHandler}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
        const pages = [];
        for(let i = 1; i <= pagesCount; i++){
            pages.push(i)
    }
    const portionSize = 10;
    const portionCount = Math.ceil(totalItemsCount / portionSize);
     
    const [ portionNumberState, setPortionNumberState ] = useState(portionNumber);
    const leftPortionPageNumber = (portionNumberState - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumberState * portionSize;
    
    const portionNumberHandler = (side: string) => {
        if(side === 'back') {
            setPortionNumberState(portionNumberState - 1)
            setPortionNumber(portionNumberState - 1)   
        } else {
            setPortionNumberState(portionNumberState + 1)
            setPortionNumber(portionNumberState + 1)   
        }
    }
    return (
        <div>
            {
                portionNumber > 1 && <button onClick={() =>  portionNumberHandler('back')}>PREV</button>
            }
            { pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => (
                <span 
                    className={currentPage === p ? classes.bold : " "}
                    onClick={() => onPageChangeHandler(p)}
                    key={p}
                >
                {p}  
                </span>
            ))}
            {
                portionCount > portionNumber && <button onClick={() => portionNumberHandler('next')}>NEXT</button>
            }
        </div>)
}

export default Paginator;
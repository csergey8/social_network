import React, { useState } from 'react';
import classes from './Users.module.css';

const Paginator = props => {
    const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
        const pages = [];
        for(let i = 1; i <= pagesCount; i++){
            pages.push(i)
    }
    const portionSize = 10;
    const portionCount = Math.ceil(props.totalItemsCount / portionSize);
    const [ portionNumber, setPortionNumber ] = useState(props.portionNumber);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    console.log(portionNumber);
    const portionNumberHandler = side => {
        if(side === 'back') {
            setPortionNumber(portionNumber - 1)
            props.setPortionNumber(portionNumber - 1)   
        } else {
            setPortionNumber(portionNumber + 1)
            props.setPortionNumber(portionNumber + 1)   
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
                        className={props.currentPage === p ? classes.bold : " "}
                        onClick={() => props.onPageChangeHandler(p)}
                        key={p}
                    >
                    {p}  
                    </span>
                ))}
                {
                    portionCount > portionNumber && <button onClick={() => portionNumberHandler()}>NEXT</button>
                }
            </div>
    )
}

export default Paginator;
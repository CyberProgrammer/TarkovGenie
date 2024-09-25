import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import '@styles/lists/trader-list.css';

import {RootState} from "@reducers/rootReducer.ts";
import {changeTraderFilter} from "../../actions/userActions.ts";

import TraderList from "../../../data/traders.json";

const TradersList = () => {
    const dispatch = useDispatch();

    const traders = TraderList.data.traders;

    // Trader filter
    const traderFilter = useSelector((state: RootState) => state.tasks.traderFilter);

    const [traderIndex, setTraderIndex] = useState<number>(0);

    const traderRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Function to scroll to a specific trader
    const scrollToTrader = (index: number) => {
        if (traderRefs.current[index]) {
            traderRefs.current[index]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }

        if(index <= 9)
            setTraderIndex(index);
    };

    const handleTraderFilterChange = (id: number) => {
        console.log("ID: ", id);
        dispatch(changeTraderFilter(id))
    }

    // Scrolls based on trader index
    const scrollLeft = traderIndex - 3;
    const scrollRight = traderIndex + 3;

    return (
        <div className="trader-scroll-container">
            <button className="scroll-btn" onClick={() => scrollToTrader(scrollLeft)}>◀</button>

            <div className="trader-list">
                {traders.map((trader, index) => (
                    <button
                        key={trader.id}
                        ref={(element) => traderRefs.current[index] = element}
                        className={`trader-filter-btn ${traderFilter === index ? 'selected-btn' : ''}`}
                        onClick={() => handleTraderFilterChange(index)}
                    >
                        <img className={'trader-filter-icon'} src={trader.imageLink} alt={trader.name}/>
                        {trader.name}
                    </button>
                ))}
            </div>

            <button className="scroll-btn" onClick={() => scrollToTrader(scrollRight)}>▶</button>
        </div>
    )
}

export default TradersList;
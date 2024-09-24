import {decreaseLevel, increaseLevel} from "../../actions/userActions.ts";
import UpIcon from "@icons/up.svg";
import DownIcon from "@icons/down.svg";

import {useDispatch} from "react-redux";

interface Props {
    action: string;
}
const ChangeLevelBtn: React.FC<Props> = ({action}) => {
    const dispatch = useDispatch();

    return (
        <button className={'user-level-control-btn'} onClick={() =>
            {dispatch(action === 'increase' ? increaseLevel() : decreaseLevel());
        }}>
            <img className={'user-level-control-icon'} src={action === 'increase' ? UpIcon : DownIcon} alt={'icon'}/>
        </button>
    )
}

export default ChangeLevelBtn;
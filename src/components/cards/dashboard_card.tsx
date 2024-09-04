import '@styles/cards/dashboard-card.css';

import TipIcon from '@icons/help.svg';

interface CardProps{
    className?: string;
    title: string,
    stats: string,
    tooltip: string
}

const DashboardCard = ({className, title, stats, tooltip}:CardProps) => {

    return(
        <>
            <div className={`dashboard-card ${className}`}>
                <div className={'dashboard-card-content'}>
                    <h3 className={'dashboard-card-title'}>{title}</h3>
                    <h2 className={'dashboard-card-stats'}>{stats}</h2>
                </div>
                <div className={'dashboard-card-tooltip'}>
                    <img className={'dashboard-card-tooltip-icon'} src={TipIcon} alt={'icon'}/>
                    <p>{tooltip}</p>
                </div>
            </div>
        </>
    )
}

export default DashboardCard;
import DashboardCard from '@components/cards/dashboard_card';
import '@styles/views/dashboard/dashboard.css'

import Scav from '@images/scav.png';
import {useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";

const Dashboard = () => {

    const alert  = {
        title: 'Wipe Update',
        message: (
            <h3>
                Changes to quests and hideout upgrades from the 0.15.0.0 patch will be pulled
                automatically from <a href="#">tarkov.dev</a> as they are discovered and confirmed.
            </h3>
        ),
    }

    // Tasks completed count
    const tasksCompletedCount = useSelector((state: RootState) => state.tasks.tasksCompleted);
    // Tasks total count
    const totalTaskCount = useSelector((state: RootState) => state.tasks.tasksCount);
    // Task items found
    const taskItemsFound = useSelector((state: RootState) => state.tasks.taskItemsFound);
    // Total items to be found
    const totalTaskItems = useSelector((state: RootState) => state.tasks.totalTaskItems);

    // Hideout items found
    const hideoutItemsFound = useSelector((state: RootState) => state.hideout.hideoutItemsFound);
    // Hideout items total
    const totalHideoutItems = useSelector((state: RootState) => state.hideout.totalHideoutItemsCount);

    const cards =
        [{
            title: 'Tasks Completed',
            stats: `${tasksCompletedCount}/${totalTaskCount}`,
            tooltip: 'The number of tasks you have completed'
        },
        {
            title: 'Task Items',
            stats: `${taskItemsFound}/${totalTaskItems}`,
            tooltip: 'Includes FIR, non-FIR, and planted items.',
            className: 'dashboard-card-center'
        },
        {
            title: 'Hideout Items',
            stats: `${hideoutItemsFound}/${totalHideoutItems}`,
            tooltip: 'The number of hideout items needed.'
        }]


    return(
        <>
            <div className={'view-content'}>
                <div className={'dashboard-introduction'}>
                    <img className={'dashboard-introduction-image'} src={Scav} alt={'Scav'}/>
                    <div className={'dashboard-introduction-wrapper'}>
                        <h2>{alert.title}</h2>
                        <div className={'dashboard-introduction-message'}>
                            {alert.message}
                        </div>
                    </div>
                </div>
                <div className={'dashboard-cards-wrapper'}>
                    { cards.map((card, index) => {
                        return (
                            <DashboardCard
                                key={index}
                                title={card.title}
                                stats={card.stats}
                                tooltip={card.tooltip}
                                className={card.className}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Dashboard;
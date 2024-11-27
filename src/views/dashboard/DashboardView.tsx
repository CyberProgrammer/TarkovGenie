import DashboardCard from '@components/cards/dashboard_card';
import '@styles/views/dashboard/dashboard.css'

import Scav from '@images/scav.png';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {useEffect} from "react";
import {fetchHideoutData} from "../../api/fetch/fetchHideoutData.ts";
import {fetchTaskData} from "../../api/fetch/fetchTaskData.ts";
import {fetchItemData} from "../../api/fetch/fetchItemData.ts";
import {updateItemsData} from "../../actions/itemsActions.ts";
import {updateStationData} from "../../actions/hideoutActions.ts";

const DashboardView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const apiHideoutData = await fetchHideoutData();
            const apiTaskData = await fetchTaskData();
            const apiItemData = await fetchItemData();
            // console.log("Item data: ", apiItemData);
            // console.log("Hideout data: ", apiHideoutData);
            // console.log("Task data: ", apiTaskData);

            if(apiHideoutData.length == 0 || apiTaskData.length == 0 || apiItemData.length == 0){
                console.log("Missing data...");
                return;
            }

            // Update item data
            dispatch(updateItemsData(apiHideoutData, apiTaskData, apiItemData));

            // Update hideout data
            dispatch(updateStationData(apiHideoutData))
        }

        fetchData();
    }, []);

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
    const taskItemsFound = useSelector((state: RootState) => state.itemsNeeded.taskItemCount);
    // Total items to be found
    const totalTaskItems = useSelector((state: RootState) => state.itemsNeeded.taskItemTotalCount);

    // Hideout items found
    const hideoutItemsFound = useSelector((state: RootState) => state.itemsNeeded.hideoutItemCount);
    // Hideout items total
    const totalHideoutItems = useSelector((state: RootState) => state.itemsNeeded.hideoutItemTotalCount);

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
                <div id={'content-container'}>
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
                        {cards.map((card, index) => {
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
            </div>
        </>
    )
}

export default DashboardView;
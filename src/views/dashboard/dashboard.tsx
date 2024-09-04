import DashboardCard from '@components/cards/dashboard_card';
import '@styles/views/dashboard/dashboard.css'

import Scav from '@images/scav.png';

const Dashboard = () => {

    return(
        <>
            <div className={'view-content'}>
                <div className={'dashboard-introduction'}>
                    <img className={'dashboard-introduction-image'} src={Scav} alt={'Scav'}/>
                    <div className={'dashboard-introduction-wrapper'}>
                        <h2>Wipe Update</h2>
                        <div className={'dashboard-introduction-message'}>
                            <h3>
                                Changes to quests and hideout upgrades from the 0.15.0.0 patch will be pulled
                                automatically from
                                <a href={'#'}> tarkov.dev </a>
                                as they are discovered and confirmed.
                            </h3>
                        </div>
                    </div>
                </div>
                <div className={'dashboard-cards-wrapper'}>
                    <DashboardCard title={'Tasks Completed'} stats={'43/145'}
                                   tooltip={'The number of tasks you have completed'}/>
                    <DashboardCard className={'dashboard-card-center'} title={'Task Items'} stats={'54/924'} tooltip={'Includes FIR, non-FIR, and planted items.'}/>
                    <DashboardCard title={'Hideout Items'} stats={'54/300'} tooltip={'The number of hideout items needed.'}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
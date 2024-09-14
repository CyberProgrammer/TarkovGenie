import CompleteIcon from '@icons/task_objectives/complete.svg';

import '@styles/buttons/button_with_icon.css';

const ButtonWithIcon = () => {

    return(
        <>
            <button className={'btn-with-icon'}>
                <div className={'btn-with-icon-wrapper'}>
                    <img className={'btn-icon'} src={CompleteIcon} alt={'icon'} />
                    <h3>Complete</h3>
                </div>
            </button>
        </>
    )
}

export default ButtonWithIcon;
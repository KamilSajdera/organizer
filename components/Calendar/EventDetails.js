import styles from './EventDetails.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

export default function EventDetails() {
    return <div className={styles['event-details']}>
        <FontAwesomeIcon icon={faCircleInfo} />
        <h3>event1</h3>
        <p>Say hello to Web Awesome, the biggest and best library of open-source web components.</p>
        <div className={styles['event-details_duration']}>
            <FontAwesomeIcon icon={faClock} /> All day
        </div> 
        <button className={styles.btnClose}>Close</button>
    </div>
}
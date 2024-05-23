import styles from './Controls.module.scss';

export default function Controls() {
    return (
        <div className={styles['user-controls']}>
            <button>Change password</button>
            <button>Log out</button>
        </div>
    )
}
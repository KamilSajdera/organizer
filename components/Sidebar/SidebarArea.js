import styles from "./SidebarArea.module.scss";

export default function SidebarArea() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles['sidebar-logo']}>
                <div className={styles['sidebar-logo_squares']}></div>
                <p>MANAGEO</p>
            </div>
        </aside>
    )
};


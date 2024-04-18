import styles from "./SidebarArea.module.scss";
import NavItems from "./NavItems";

export default function SidebarArea() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles['sidebar-logo']}>
                <div className={styles['sidebar-logo_squares']}></div>
                <p>MANAGEO</p>
            </div>
            <NavItems />
        </aside>
    )
};


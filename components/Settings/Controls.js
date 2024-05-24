'use client'

import styles from './Controls.module.scss';
import { logOut } from '@/lib/auth';

export default function Controls() {

    async function handleLogOut() {
        await logOut();
    }

    return (
        <div className={styles['user-controls']}>
            <button>Change password</button>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}
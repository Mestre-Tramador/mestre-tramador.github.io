//#region License
/**
 * HIGH is a single page application that govern Mestre-Tramador's virtual repositories and data.
 * Copyright (C) 2023  Mestre-Tramador
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
//#endregion

import type { ReportHandler } from 'web-vitals';

/**
 * Report the vital analytics of the web browser for performances check.
 *
 * Recommended to be run only on DEV.
 *
 * @param handler If given, this function will report the analytics of the app.
 * @returns An empty Promise, for easy management.
 */
async function reportWebVitals(handler?: ReportHandler): Promise<void> {
    if (handler && handler instanceof Function) {
        try {
            const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

            getCLS(handler);
            getFID(handler);
            getFCP(handler);
            getLCP(handler);
            getTTFB(handler);
        } catch (e: unknown) {
            console.log(e);
        }
    }
}

export default reportWebVitals;

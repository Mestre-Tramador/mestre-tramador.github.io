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

/**
 * Unregister the PWA Service Worker, if registered.
 *
 * @returns An empty Promise, for easy management.
 */
async function unregisterServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
        try {
            /**
             * The registration of the Service Worker.
             */
            const registration = await navigator.serviceWorker.ready;

            if (await registration.unregister()) {
                // Service Worker unregistered!

                return;
            }

            // Service Worker already unregistered or inexistent!
        } catch (e: unknown) {
            console.log(e);
        }
    }
}

export default unregisterServiceWorker;

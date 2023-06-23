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

import unregisterServiceWorker from './unregisterServiceWorker';

/**
 * Register the PWA Service Worker, or update it if
 * a new is available.
 *
 * @returns An empty Promise, for easy management.
 */
async function registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
        /**
         * The URL to the `public/` folder.
         */
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        window.addEventListener('load', async () => {
            /**
             * URL to the Service Worker (JavaScript) file.
             */
            const serviceUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (
                window.location.hostname === 'localhost' ||
                window.location.hostname === '[::1]' ||
                window.location.hostname.match(
                    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
                )
            ) {
                try {
                    /**
                     * Response to the fetching of the Service Worker
                     * file in localhost.
                     */
                    const res = await fetch(serviceUrl, {
                        headers: { 'Service-Worker': 'script' }
                    });

                    if (
                        res.status === 404 ||
                        res.headers.get('content-type')?.indexOf('javascript') === -1
                    ) {
                        await unregisterServiceWorker();

                        window.location.reload();

                        return;
                    }
                } catch (e: unknown) {
                    console.log(e);
                }
            }

            try {
                /**
                 * Service Worker registration process.
                 */
                const registration = await navigator.serviceWorker.register(serviceUrl);

                registration.onupdatefound = () => {
                    /**
                     * The installing status of the PWA.
                     */
                    const installing = registration.installing;

                    if (!installing) {
                        return;
                    }

                    installing.onstatechange = () => {
                        if (installing.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // Service Worker updated successfully!

                                return;
                            }

                            // Service Worker installed successfully!
                        }
                    };
                };
            } catch (e: unknown) {
                console.log(e);
            }
        });
    }
}

export default registerServiceWorker;

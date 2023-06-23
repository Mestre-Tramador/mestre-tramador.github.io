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

import type { CommandInputResult } from '@interfaces/CommandInputResult';

/**
 * Represent an Command operable by HIGH.
 *
 * @author Mestre-Tramador
 */
class Command {
    /**
     * Commands cannot be directly instantiated,
     * they require firstly to be handled.
     *
     * @param _input This is the full prompted string.
     */
    private constructor(private _input: string) {}

    /**
     * Handle the command, analyzing its input, arguments and
     * verifying for potential errors.
     *
     * This method works as a public constructor.
     *
     * @param input This is the full prompted string.
     * @returns Currently the result doesn't hold any important data.
     */
    public static async handle(input: string): Promise<CommandInputResult> {
        return { input };
    }
}

export { Command };
